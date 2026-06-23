import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useTheme } from "../../providers/ThemeProvider";
import { type ShopifyCollection } from "../../services/shopify";

export interface CollectionCardProps {
  collection: ShopifyCollection;
  onPress?: () => void;
}

export function CollectionCard({ collection, onPress }: CollectionCardProps) {
  const { theme } = useTheme();

  const imageUrl = collection.image?.url || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80";

  return (
    <TouchableOpacity
      onPress={onPress}
      className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100 mb-4 shadow-sm"
      style={{ borderRadius: theme.radius.lg }}
      activeOpacity={0.9}
    >
      <Image
        source={{ uri: imageUrl }}
        style={{ width: "100%", height: "100%" }}
        contentFit="cover"
        transition={250}
      />
      {/* Visual Overlay */}
      <View className="absolute inset-0 bg-black/45 justify-end p-4">
        <Text className="text-white text-lg font-bold tracking-tight">
          {collection.title}
        </Text>
        <Text className="text-white/80 text-xs font-medium mt-0.5">
          {collection.products?.length || 0} Products
        </Text>
      </View>
    </TouchableOpacity>
  );
}
