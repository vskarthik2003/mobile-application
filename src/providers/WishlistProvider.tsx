import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import type { ShopifyProduct } from "@/src/services/shopify";

// ─── Types ─────────────────────────────────────────────────────────────────

export interface WishlistItem {
  productId: string;
  handle: string;
  title: string;
  imageUrl?: string;
  price: number;
  currencyCode: string;
  addedAt: number;
}

type WishlistContextValue = {
  items: WishlistItem[];
  itemCount: number;
  addToWishlist: (product: ShopifyProduct) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
};

// ─── Context ───────────────────────────────────────────────────────────────

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<WishlistItem[]>([]);

  const addToWishlist = useCallback((product: ShopifyProduct) => {
    setItems((prev) => {
      if (prev.some((i) => i.productId === product.id)) return prev;
      return [
        ...prev,
        {
          productId: product.id,
          handle: product.handle,
          title: product.title,
          imageUrl: product.images[0]?.url,
          price: parseFloat(product.priceRange.minVariantPrice.amount),
          currencyCode: product.priceRange.minVariantPrice.currencyCode,
          addedAt: Date.now(),
        },
      ];
    });
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => items.some((i) => i.productId === productId),
    [items]
  );

  const clearWishlist = useCallback(() => setItems([]), []);

  const value = useMemo<WishlistContextValue>(
    () => ({
      items,
      itemCount: items.length,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist,
    }),
    [items, addToWishlist, removeFromWishlist, isInWishlist, clearWishlist]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside <WishlistProvider>");
  return ctx;
}
