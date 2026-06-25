import React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useWishlist } from "@/src/providers/WishlistProvider";
import { useTheme } from "@/src/providers/ThemeProvider";
import { useCart } from "@/src/providers/CartProvider";
import { useAppConfig } from "@/src/providers/AppConfigProvider";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

export default function FavoritesScreen() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { theme } = useTheme();
  const { config } = useAppConfig();

  const navTitle = config.navigation.find((n) => n.id === "favorites")?.title ?? "Favorites";

  return (
    <View className="flex-1" style={{ backgroundColor: theme.colors.background }}>
      {/* Header */}
      <View
        className="flex-row items-center justify-between px-4 py-4 border-b"
        style={{ borderColor: theme.colors.border }}
      >
        <Text className="text-xl font-bold" style={{ color: theme.colors.text }}>
          {navTitle}
        </Text>
        <Text className="text-sm font-medium" style={{ color: theme.colors.textMuted }}>
          {items.length} {items.length === 1 ? "item" : "items"}
        </Text>
      </View>

      {items.length === 0 ? (
        <View className="flex-1 items-center justify-center gap-4 px-8">
          <View
            className="w-20 h-20 rounded-full items-center justify-center"
            style={{ backgroundColor: theme.colors.surface }}
          >
            <Ionicons name="heart-outline" size={36} color={theme.colors.textMuted} />
          </View>
          <Text className="text-lg font-bold text-center" style={{ color: theme.colors.text }}>
            Your wishlist is empty
          </Text>
          <Text className="text-sm text-center" style={{ color: theme.colors.textMuted }}>
            Save items you love and find them here when you&apos;re ready to buy.
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/collections")}
            className="mt-2 px-8 py-3 rounded-full"
            style={{ backgroundColor: theme.colors.primary }}
            activeOpacity={0.85}
          >
            <Text className="text-white font-bold text-sm">Start Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: 16, gap: 16, flexDirection: "row", flexWrap: "wrap" }}
          showsVerticalScrollIndicator={false}
        >
          {items.map((item) => (
            <TouchableOpacity
              key={item.productId}
              style={{
                width: CARD_WIDTH,
                backgroundColor: theme.colors.surface,
                borderRadius: theme.radius.lg,
                overflow: "hidden",
                borderWidth: 1,
                borderColor: theme.colors.border,
              }}
              onPress={() => router.push(`/products/${item.handle}`)}
              activeOpacity={0.9}
            >
              {/* Image */}
              <View style={{ width: "100%", height: CARD_WIDTH * 1.2, backgroundColor: "#f0f0f0" }}>
                {item.imageUrl ? (
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={{ width: "100%", height: "100%" }}
                    contentFit="cover"
                  />
                ) : (
                  <View className="flex-1 items-center justify-center">
                    <Ionicons name="image-outline" size={32} color={theme.colors.textMuted} />
                  </View>
                )}
                {/* Remove button */}
                <TouchableOpacity
                  onPress={() => removeFromWishlist(item.productId)}
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    backgroundColor: "rgba(255,255,255,0.9)",
                    borderRadius: 20,
                    padding: 6,
                  }}
                  activeOpacity={0.8}
                >
                  <Ionicons name="heart" size={16} color={theme.colors.primary} />
                </TouchableOpacity>
              </View>

              {/* Info */}
              <View className="p-3 gap-1">
                <Text
                  className="text-sm font-semibold"
                  numberOfLines={2}
                  style={{ color: theme.colors.text }}
                >
                  {item.title}
                </Text>
                <Text className="text-sm font-bold" style={{ color: theme.colors.primary }}>
                  ₹{item.price.toLocaleString("en-IN")}
                </Text>
                <TouchableOpacity
                  onPress={() => router.push(`/products/${item.handle}`)}
                  className="mt-2 py-2 rounded-lg items-center"
                  style={{ backgroundColor: theme.colors.primary }}
                  activeOpacity={0.85}
                >
                  <Text className="text-white text-xs font-bold">Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
