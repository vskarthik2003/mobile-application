import React, { createContext, useContext, type PropsWithChildren } from "react";
import type { ShopifyCollection, ShopifyProduct } from "@/src/services/shopify";

interface CollectionContextValue {
  collection: ShopifyCollection | null;
  products: ShopifyProduct[];
  loading: boolean;
  error: Error | null;
  handle: string;
}

const CollectionContext = createContext<CollectionContextValue | null>(null);

type Props = PropsWithChildren<CollectionContextValue>;

export function CollectionContextProvider({ children, ...value }: Props) {
  return <CollectionContext.Provider value={value}>{children}</CollectionContext.Provider>;
}

export function useCollectionContext(): CollectionContextValue {
  const ctx = useContext(CollectionContext);
  if (!ctx) throw new Error("useCollectionContext must be inside CollectionContextProvider");
  return ctx;
}
