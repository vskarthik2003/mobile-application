import React, { createContext, useContext, useMemo, type PropsWithChildren } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────

type ShopifyContextValue = {
  domain: string;
  storefrontAccessToken: string;
  apiVersion: string;
  locale: string;
  currency: string;
};

// ─── Context ───────────────────────────────────────────────────────────────

const ShopifyContext = createContext<ShopifyContextValue | null>(null);

export function ShopifyProvider({ children }: PropsWithChildren) {
  const value = useMemo<ShopifyContextValue>(
    () => ({
      domain: process.env.EXPO_PUBLIC_SHOPIFY_DOMAIN ?? "",
      storefrontAccessToken: process.env.EXPO_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ?? "",
      apiVersion: "2024-01",
      locale: "en-US",
      currency: "INR",
    }),
    []
  );

  return <ShopifyContext.Provider value={value}>{children}</ShopifyContext.Provider>;
}

export function useShopify(): ShopifyContextValue {
  const ctx = useContext(ShopifyContext);
  if (!ctx) throw new Error("useShopify must be used inside <ShopifyProvider>");
  return ctx;
}
