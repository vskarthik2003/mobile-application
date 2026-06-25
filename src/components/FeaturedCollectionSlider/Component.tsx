import React from "react";
import { View, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { SectionContainer, SectionHeading, ProductCard, EmptyState } from "../primitives";
import { useCollection } from "../../hooks/useCollection";
import type { FeaturedCollectionSliderProps } from "./types";

export function FeaturedCollectionSlider({
  sectionId,
  collectionId,
  title,
  subtitle,
  limit,
  showPrices,
}: Readonly<FeaturedCollectionSliderProps>) {
  const { products, loading, error } = useCollection(collectionId);

  const displayedProducts = products ? products.slice(0, limit) : [];

  const router = useRouter();

  return (
    <SectionContainer
      sectionId={sectionId}
      loading={loading}
      error={error}
      paddingY="medium"
      paddingX="none"
    >
      <View className="px-4">
        <SectionHeading
          title={title}
          subtitle={subtitle}
          actionLabel="View All"
          onActionPress={() => router.push("/products")}
        />
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
              <ProductCard
                product={p}
                showPrices={showPrices}
                onPress={() => router.push(`/products/${p.id}`)}
              />
            </View>
          ))}
        </ScrollView>
      )}
    </SectionContainer>
  );
}
