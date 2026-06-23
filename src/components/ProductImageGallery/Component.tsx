import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, type NativeSyntheticEvent, type NativeScrollEvent } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../providers/ThemeProvider";
import { SectionContainer } from "../primitives";

import type { ProductImageGalleryProps } from "./types";

export function ProductImageGallery({
  sectionId,
  imageUrls,
  dotColor,
  activeDotColor,
}: ProductImageGalleryProps) {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const urls = imageUrls || [];

  if (urls.length === 0) return null;

  return (
    <SectionContainer sectionId={sectionId} paddingY="none" paddingX="none">
      <View className="relative w-full aspect-[4/5] bg-gray-50">
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
            const width = e.nativeEvent.layoutMeasurement.width;
            const offset = e.nativeEvent.contentOffset.x;
            if (width > 0) {
              setActiveIndex(Math.round(offset / width));
            }
          }}
          scrollEventThrottle={16}
        >
          {urls.map((url, idx) => (
            <View key={idx} style={{ width: 400, height: "100%" }} className="w-screen">
              <Image source={{ uri: url }} style={{ width: "100%", height: "100%" }} contentFit="cover" />
            </View>
          ))}
        </ScrollView>

        {/* Floating Indicator Dots */}
        {urls.length > 1 && (
          <View className="absolute bottom-4 left-0 right-0 flex-row justify-center gap-1.5">
            {urls.map((_, idx) => (
              <View
                key={idx}
                className="w-2 h-2 rounded-full shadow-sm"
                style={{
                  backgroundColor: idx === activeIndex ? activeDotColor : dotColor,
                }}
              />
            ))}
          </View>
        )}
      </View>
    </SectionContainer>
  );
}
