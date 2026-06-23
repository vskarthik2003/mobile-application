import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useTheme } from "../../providers/ThemeProvider";
import { type ShopifyProduct } from "../../services/shopify";
import { Ionicons } from "@expo/vector-icons";

export interface ProductCardProps {
  product: ShopifyProduct;
  onPress?: () => void;
  onAddToCart?: () => void;
  showPrices?: boolean;
}

export function ProductCard({
  product,
  onPress,
  onAddToCart,
  showPrices = true,
}: ProductCardProps) {
  const { theme } = useTheme();

  const mainImage = product.images?.[0]?.url || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80";
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const compareAtPrice = product.compareAtPriceRange
    ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount)
    : 0;

  const hasDiscount = compareAtPrice > price;
  const discountPercent = hasDiscount
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : 0;

  const currencySymbol = product.priceRange.minVariantPrice.currencyCode === "INR" ? "₹" : "$";

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 rounded-xl overflow-hidden mb-4 bg-white border border-gray-100/50 shadow-sm"
      style={{ borderRadius: theme.radius.md }}
      activeOpacity={0.9}
    >
      {/* Product Image */}
      <View className="relative w-full aspect-[4/5] bg-gray-50">
        <Image
          source={{ uri: mainImage }}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
          transition={200}
        />
        {/* Discount Badge */}
        {hasDiscount && (
          <View
            style={{ backgroundColor: theme.colors.primary }}
            className="absolute top-2 left-2 px-2 py-0.5 rounded-full"
          >
            <Text className="text-[10px] font-bold text-white">-{discountPercent}%</Text>
          </View>
        )}
      </View>

      {/* Info */}
      <View className="p-3">
        {product.vendor && (
          <Text className="text-[10px] uppercase tracking-wider font-semibold mb-0.5" style={{ color: theme.colors.textMuted }}>
            {product.vendor}
          </Text>
        )}
        <Text
          numberOfLines={2}
          className="text-xs font-semibold leading-tight min-h-[32px]"
          style={{ color: theme.colors.text }}
        >
          {product.title}
        </Text>

        {/* Pricing */}
        {showPrices && (
          <View className="flex-row items-center gap-1.5 mt-2">
            <Text className="text-sm font-bold" style={{ color: theme.colors.text }}>
              {currencySymbol}
              {price.toLocaleString()}
            </Text>
            {hasDiscount && (
              <Text className="text-[10px] line-through" style={{ color: theme.colors.textMuted }}>
                {currencySymbol}
                {compareAtPrice.toLocaleString()}
              </Text>
            )}
          </View>
        )}

        {/* Add to Cart Button */}
        {onAddToCart && (
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            className="mt-3 py-2 flex-row items-center justify-center gap-1 bg-gray-50 border border-gray-200"
            style={{ borderRadius: theme.radius.sm }}
          >
            <Ionicons name="cart-outline" size={14} color={theme.colors.text} />
            <Text className="text-[11px] font-semibold" style={{ color: theme.colors.text }}>
              Add to Cart
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}
