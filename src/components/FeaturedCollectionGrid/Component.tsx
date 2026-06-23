import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../providers/ThemeProvider";
import { SectionContainer, SectionHeading, SectionCTA } from "../primitives";
import { ScrollView } from "react-native";
import { useCollection } from "../../hooks/useCollection";
import { ProductCard, CollectionCard, EmptyState } from "../primitives";
import type { FeaturedCollectionGridProps } from "./types";

export function FeaturedCollectionGrid({
  sectionId,
  collectionId,
  title,
  subtitle,
  limit,
  columns,
  showPrices,
}: FeaturedCollectionGridProps) {
  const { products, loading, error } = useCollection(collectionId);
  const { theme } = useTheme();

  const handleRetry = () => {
    // Retry triggered by refetch
  };

  const displayedProducts = products ? products.slice(0, limit) : [];

  return (
    <SectionContainer
      sectionId={sectionId}
      loading={loading}
      error={error}
      onRetry={handleRetry}
      paddingY="medium"
      paddingX="medium"
    >
      <SectionHeading title={title} subtitle={subtitle} actionLabel="View All" onActionPress={() => {}} />

      {displayedProducts.length === 0 && !loading ? (
        <EmptyState title="No Products Found" description="Try selecting a different collection." />
      ) : (
        <View className="flex-row flex-wrap justify-between mt-1">
          {displayedProducts.map((p) => (
            <View key={p.id} style={{ width: columns === 2 ? "48%" : "31%" }}>
              <ProductCard product={p} showPrices={showPrices} />
            </View>
          ))}
        </View>
      )}
    </SectionContainer>
  );
}
