import { useState, useEffect, useCallback } from "react";
import { getCollections, type ShopifyCollection } from "../services/shopify";

export function useCollections(collectionIds?: string[]) {
  const [collections, setCollections] = useState<ShopifyCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCollectionsData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCollections(collectionIds);
      setCollections(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch collections"));
    } finally {
      setLoading(false);
    }
  }, [collectionIds]);

  useEffect(() => {
    fetchCollectionsData();
  }, [fetchCollectionsData]);

  return {
    collections,
    loading,
    error,
    refetch: fetchCollectionsData,
  };
}
