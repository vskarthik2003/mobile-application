import { useState, useEffect, useCallback } from "react";
import { getRelatedProducts } from "../services/shopify";
import type { ShopifyProduct } from "../services/shopify";

export function useRelatedProducts(productHandle?: string, limit = 6) {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    if (!productHandle) return;
    setLoading(true);
    setError(null);
    try {
      const results = await getRelatedProducts(productHandle, limit);
      setProducts(results);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch related products"));
    } finally {
      setLoading(false);
    }
  }, [productHandle, limit]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { products, loading, error, refetch: fetch };
}
