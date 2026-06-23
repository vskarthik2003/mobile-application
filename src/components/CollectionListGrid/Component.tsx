import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../providers/ThemeProvider";
import { SectionContainer, SectionHeading, SectionCTA } from "../primitives";
import { ScrollView } from "react-native";
import { useCollections } from "../../hooks/useCollections";
import { ProductCard, CollectionCard, EmptyState } from "../primitives";
import type { CollectionListGridProps } from "./types";

export function CollectionListGrid({
  sectionId,
  collectionIds,
  title,
  subtitle,
  columns,
}: CollectionListGridProps) {
  const { collections, loading, error } = useCollections(collectionIds);

  return (
    <SectionContainer
      sectionId={sectionId}
      loading={loading}
      error={error}
      paddingY="medium"
      paddingX="medium"
    >
      <SectionHeading title={title} subtitle={subtitle} />

      {collections.length === 0 && !loading ? (
        <EmptyState title="No Collections" />
      ) : (
        <View className="w-full mt-1">
          {collections.map((col) => (
            <CollectionCard key={col.id} collection={col} />
          ))}
        </View>
      )}
    </SectionContainer>
  );
}
