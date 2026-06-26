import { useRouter } from "expo-router";
import React from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import ProductDetailsJson from "../config/mock-products";
import { useTheme } from "../providers/ThemeProvider";

export interface FeaturedCollectionGridProps {
  collectionId?: string;
  collectionHandle?: string;
  title?: string;
  columns?: 2 | 3;
  limit?: number;
  showSaleBadge?: boolean;
  cardStyle?: "default" | "minimal" | "bordered";
  sortOrder?: "best_selling" | "newest" | "price_asc" | "price_desc";
}

// Mock data structure for products (replace with your actual data/fetching logic)
const MOCK_PRODUCTS = ProductDetailsJson.data.products.edges;

// Fallback design tokens (if not imported globally)
const SPACING = { lg: 16, xl: 24 };
const FONT_SIZES = { xl: 20 };
const FONT_WEIGHTS = { bold: "700" as const };

export default function FeaturedCollectionGrid({
  collectionHandle,
  title,
  columns = 2,
  limit = 6,
  showSaleBadge = true,
  cardStyle = "minimal",
}: FeaturedCollectionGridProps) {
  const theme = useTheme();
  const router = useRouter();

  // Define a gap spacing for your grid item layout
  const gap = 12;

  // Slicing data based on your limit prop
  const displayedProducts = MOCK_PRODUCTS.slice(0, limit);

  return (
    <View style={[styles.container, { backgroundColor: "#000000" }]}>
      {title && (
        <Text style={[styles.title, { color: "#FFFFFF" }]}>{title}</Text>
      )}
      <FlatList
        data={displayedProducts}
        numColumns={columns}
        scrollEnabled={false}
        // Key updating helps FlatList handle dynamic columns cleanly if they change on the fly
        key={columns}
        keyExtractor={(item) => item.node.id}
        columnWrapperStyle={columns > 1 ? { gap } : undefined}
        contentContainerStyle={{ gap }}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <Text style={styles.cardText}>{item.node.title}</Text>
            <Button
              title="Click"
              onPress={() =>
                router.push(`/products/${item.node.id.split("/").pop()}`)
              }
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    textAlign: "center",
    marginBottom: SPACING.lg,
    letterSpacing: 0.5,
  },
  cardContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#1A1A1A",
    borderRadius: 8,
    alignItems: "center",
  },
  cardText: {
    color: "#FFFFFF",
  },
});
