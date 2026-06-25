import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { useCollection } from "../../hooks/useCollection";
import {
  EmptyState,
  ProductCard,
  SectionContainer,
  SectionHeading,
} from "../primitives";
import type { FeaturedCollectionGridProps } from "./types";

export function FeaturedCollectionGrid({
  sectionId,
  collectionId,
  title,
  subtitle,
  limit,
  columns,
  showPrices,
}: Readonly<FeaturedCollectionGridProps>) {
  const { products, loading, error } = useCollection(collectionId);

  const handleRetry = () => {
    // Retry triggered by refetch
  };

  const displayedProducts = products ? products.slice(0, limit) : [];

  const router = useRouter();

  return (
    <SectionContainer
      sectionId={sectionId}
      loading={loading}
      error={error}
      onRetry={handleRetry}
      paddingY="medium"
      paddingX="medium"
    >
      <SectionHeading
        title={title}
        subtitle={subtitle}
        actionLabel="View All"
        onActionPress={() => router.push("/products")}
      />

      {displayedProducts.length === 0 && !loading ? (
        <EmptyState
          title="No Products Found"
          description="Try selecting a different collection."
        />
      ) : (
        <View className="flex-row flex-wrap justify-between mt-1">
          {displayedProducts.map((p) => (
            <View key={p.id} style={{ width: columns === 2 ? "48%" : "31%" }}>
              <ProductCard
                product={p}
                showPrices={showPrices}
                onPress={() => router.push(`/products/${p.id}`)}
              />
            </View>
          ))}
        </View>
      )}
    </SectionContainer>
  );
}
