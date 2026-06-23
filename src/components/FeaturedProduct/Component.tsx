import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../providers/ThemeProvider";
import { SectionContainer, SectionHeading, SectionCTA } from "../primitives";
import { ScrollView } from "react-native";
import { useProduct } from "../../hooks/useProduct";
import { ProductCard, CollectionCard, EmptyState } from "../primitives";
import type { FeaturedProductProps } from "./types";

export function FeaturedProduct({
  sectionId,
  productId,
  showQuantitySelector,
  showDescription,
  showVariantPicker,
  showBuyNow,
}: FeaturedProductProps) {
  const { product, loading, error } = useProduct(productId);
  const { theme } = useTheme();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  useEffect(() => {
    if (product && product.options) {
      const initial: Record<string, string> = {};
      product.options.forEach((opt) => {
        if (opt.values.length > 0) {
          initial[opt.name] = opt.values[0];
        }
      });
      setSelectedVariants(initial);
    }
  }, [product]);

  if (loading) return <SectionContainer sectionId={sectionId} loading={true}><Text>Loading...</Text></SectionContainer>;
  if (error || !product) return <SectionContainer sectionId={sectionId} error={error || "Product not found"}><Text>Error</Text></SectionContainer>;

  // Find matching variant
  const currentVariant = product.variants.find((v) => {
    return v.selectedOptions.every((opt) => selectedVariants[opt.name] === opt.value);
  }) || product.variants[0];

  const price = parseFloat(currentVariant?.price.amount || product.priceRange.minVariantPrice.amount);
  const compareAtPrice = currentVariant?.compareAtPrice
    ? parseFloat(currentVariant.compareAtPrice.amount)
    : 0;
  const hasDiscount = compareAtPrice > price;

  const images = product.images.map(img => img.url);

  return (
    <SectionContainer sectionId={sectionId} paddingY="medium" paddingX="medium">
      <View className="w-full gap-4">
        {/* Product Images Swiper stub */}
        <View className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-gray-100" style={{ borderRadius: theme.radius.lg }}>
          <Image source={{ uri: images[0] }} style={{ width: "100%", height: "100%" }} contentFit="cover" />
        </View>

        {/* Details */}
        <View className="gap-2">
          {product.vendor && (
            <Text className="text-xs uppercase tracking-wider font-semibold" style={{ color: theme.colors.textMuted }}>
              {product.vendor}
            </Text>
          )}
          <Text className="text-2xl font-bold tracking-tight" style={{ color: theme.colors.text }}>
            {product.title}
          </Text>

          {/* Price */}
          <View className="flex-row items-center gap-2 mt-1">
            <Text className="text-xl font-extrabold" style={{ color: theme.colors.text }}>
              ₹{price.toLocaleString()}
            </Text>
            {hasDiscount && (
              <Text className="text-sm line-through" style={{ color: theme.colors.textMuted }}>
                ₹{compareAtPrice.toLocaleString()}
              </Text>
            )}
          </View>
        </View>

        {/* Variant Picker */}
        {showVariantPicker && product.options.map((opt) => (
          <View key={opt.name} className="gap-2 mt-1">
            <Text className="text-xs font-bold" style={{ color: theme.colors.text }}>
              {opt.name}: <Text className="font-medium" style={{ color: theme.colors.textMuted }}>{selectedVariants[opt.name]}</Text>
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {opt.values.map((val) => {
                const isSelected = selectedVariants[opt.name] === val;
                return (
                  <TouchableOpacity
                    key={val}
                    onPress={() => setSelectedVariants(prev => ({ ...prev, [opt.name]: val }))}
                    style={{
                      borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                      borderWidth: 1,
                      backgroundColor: isSelected ? theme.colors.primary + "10" : "transparent",
                      borderRadius: theme.radius.sm
                    }}
                    className="px-3 py-1.5"
                    activeOpacity={0.8}
                  >
                    <Text className="text-xs font-semibold" style={{ color: isSelected ? theme.colors.primary : theme.colors.text }}>
                      {val}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        {/* Quantity selector */}
        {showQuantitySelector && (
          <View className="flex-row items-center gap-4 mt-2">
            <Text className="text-xs font-bold" style={{ color: theme.colors.text }}>Quantity</Text>
            <View className="flex-row items-center border border-gray-200 rounded-lg overflow-hidden">
              <TouchableOpacity
                onPress={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-10 h-10 items-center justify-center bg-gray-50 border-r border-gray-200"
              >
                <Ionicons name="remove" size={18} color={theme.colors.text} />
              </TouchableOpacity>
              <Text className="w-12 text-center text-sm font-bold" style={{ color: theme.colors.text }}>{quantity}</Text>
              <TouchableOpacity
                onPress={() => setQuantity(q => q + 1)}
                className="w-10 h-10 items-center justify-center bg-gray-50 border-l border-gray-200"
              >
                <Ionicons name="add" size={18} color={theme.colors.text} />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Description */}
        {showDescription && product.description && (
          <View className="mt-2 border-t border-gray-100 pt-4 gap-2">
            <Text className="text-xs font-bold" style={{ color: theme.colors.text }}>Product Description</Text>
            <Text className="text-xs leading-relaxed font-medium" style={{ color: theme.colors.textMuted }}>
              {product.description}
            </Text>
          </View>
        )}

        {/* CTA Buttons */}
        <View className="gap-2.5 mt-4">
          <SectionCTA label="Add to Cart" variant="secondary" fullWidth={true} />
          {showBuyNow && (
            <SectionCTA label="Buy Now" variant="primary" fullWidth={true} />
          )}
        </View>
      </View>
    </SectionContainer>
  );
}
