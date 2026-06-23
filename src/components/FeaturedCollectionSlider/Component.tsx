import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../providers/ThemeProvider";
import { SectionContainer, SectionHeading, SectionCTA } from "../primitives";
import { ScrollView } from "react-native";
import { useCollection } from "../../hooks/useCollection";
import { ProductCard, CollectionCard, EmptyState } from "../primitives";
import type { FeaturedCollectionSliderProps } from "./types";

export function FeaturedCollectionSlider({
  sectionId,
  collectionId,
  title,
  subtitle,
  limit,
  showPrices,
}: FeaturedCollectionSliderProps) {
  const { products, loading, error } = useCollection(collectionId);
  const { theme } = useTheme();

  const displayedProducts = products ? products.slice(0, limit) : [];

  return (
    <SectionContainer
      sectionId={sectionId}
      loading={loading}
      error={error}
      paddingY="medium"
      paddingX="none"
    >
      <View className="px-4">
        <SectionHeading title={title} subtitle={subtitle} actionLabel="View All" onActionPress={() => {}} />
      </View>

      {displayedProducts.length === 0 && !loading ? (
        <View className="px-4">
          <EmptyState title="No Products Found" />
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
          className="mt-1"
        >
          {displayedProducts.map((p) => (
            <View key={p.id} style={{ width: 150 }}>
              <ProductCard product={p} showPrices={showPrices} />
            </View>
          ))}
        </ScrollView>
      )}
    </SectionContainer>
  );
}
