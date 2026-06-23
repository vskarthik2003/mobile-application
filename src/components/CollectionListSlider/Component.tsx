import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../providers/ThemeProvider";
import { SectionContainer, SectionHeading, SectionCTA } from "../primitives";
import { ScrollView } from "react-native";
import { useCollections } from "../../hooks/useCollections";
import { ProductCard, CollectionCard, EmptyState } from "../primitives";
import type { CollectionListSliderProps } from "./types";

export function CollectionListSlider({
  sectionId,
  collectionIds,
  title,
  subtitle,
}: CollectionListSliderProps) {
  const { collections, loading, error } = useCollections(collectionIds);

  return (
    <SectionContainer
      sectionId={sectionId}
      loading={loading}
      error={error}
      paddingY="medium"
      paddingX="none"
    >
      <View className="px-4">
        <SectionHeading title={title} subtitle={subtitle} />
      </View>

      {collections.length === 0 && !loading ? (
        <View className="px-4">
          <EmptyState title="No Collections" />
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
          className="mt-1"
        >
          {collections.map((col) => (
            <View key={col.id} style={{ width: 280 }}>
              <CollectionCard collection={col} />
            </View>
          ))}
        </ScrollView>
      )}
    </SectionContainer>
  );
}
