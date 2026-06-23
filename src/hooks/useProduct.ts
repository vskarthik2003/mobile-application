import { useState, useEffect, useCallback } from "react";
import { getProduct, type ShopifyProduct } from "../services/shopify";

export function useProduct(productId?: string) {
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProductData = useCallback(async () => {
    if (!productId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await getProduct(productId);
      setProduct(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch product"));
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  return {
    product,
    loading,
    error,
    refetch: fetchProductData,
  };
}
