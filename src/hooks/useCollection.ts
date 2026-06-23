import { useState, useEffect, useCallback } from "react";
import { getCollection, type ShopifyCollection, type ShopifyProduct } from "../services/shopify";

export function useCollection(collectionId?: string) {
  const [collection, setCollection] = useState<ShopifyCollection | null>(null);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCollectionData = useCallback(async () => {
    if (!collectionId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await getCollection(collectionId);
      setCollection(data);
      setProducts(data.products || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch collection"));
    } finally {
      setLoading(false);
    }
  }, [collectionId]);

  useEffect(() => {
    fetchCollectionData();
  }, [fetchCollectionData]);

  return {
    collection,
    products,
    loading,
    error,
    refetch: fetchCollectionData,
  };
}
