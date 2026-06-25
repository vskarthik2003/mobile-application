import React, { createContext, useContext, useState, type PropsWithChildren } from "react";
import type { ShopifyProduct, ShopifyVariant } from "@/src/services/shopify";

interface ProductContextValue {
  product: ShopifyProduct | null;
  loading: boolean;
  error: Error | null;
  handle: string;
  // Selection state lifted up so gallery, variant selector, and CTA stay in sync
  selectedVariant: ShopifyVariant | null;
  selectedOptions: Record<string, string>;
  quantity: number;
  setSelectedOption: (name: string, value: string) => void;
  setQuantity: (qty: number) => void;
}

const ProductContext = createContext<ProductContextValue | null>(null);

type Props = PropsWithChildren<
  Omit<ProductContextValue, "selectedOptions" | "selectedVariant" | "quantity" | "setSelectedOption" | "setQuantity"> & {
    initialVariant?: ShopifyVariant;
  }
>;

export function ProductContextProvider({ children, product, loading, error, handle, initialVariant }: Props) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    if (!product?.options) return {};
    return Object.fromEntries(product.options.map((o) => [o.name, o.values[0] ?? ""]));
  });
  const [quantity, setQuantity] = useState(1);

  const selectedVariant =
    product?.variants.find((v) =>
      v.selectedOptions.every((opt) => selectedOptions[opt.name] === opt.value)
    ) ??
    product?.variants[0] ??
    null;

  function setSelectedOption(name: string, value: string) {
    setSelectedOptions((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <ProductContext.Provider
      value={{
        product,
        loading,
        error,
        handle,
        selectedVariant,
        selectedOptions,
        quantity,
        setSelectedOption,
        setQuantity,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext(): ProductContextValue {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProductContext must be inside ProductContextProvider");
  return ctx;
}
