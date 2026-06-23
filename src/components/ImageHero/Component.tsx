import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../providers/ThemeProvider";
import { SectionContainer, SectionHeading, SectionCTA } from "../primitives";

import type { ImageHeroProps } from "./types";

export function ImageHero({
  sectionId,
  imageUrl,
  title,
  subtitle,
  ctaLabel,
  ctaUrl,
  height,
  overlayOpacity,
  alignment,
}: ImageHeroProps) {
  const { theme } = useTheme();
  const textAlignment = alignment === "center" ? "items-center text-center" : alignment === "right" ? "items-end text-right" : "items-start text-left";

  return (
    <SectionContainer sectionId={sectionId} paddingX="none" paddingY="none">
      <View style={{ height }} className="relative w-full overflow-hidden bg-gray-950">
        <Image
          source={{ uri: imageUrl }}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
        />
        {/* Dark Overlay */}
        <View
          style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
          className="absolute inset-0 justify-center px-6"
        >
          <View className={`gap-3 w-full ${textAlignment}`}>
            {subtitle && (
              <Text className="text-white/90 text-xs font-bold uppercase tracking-widest">
                {subtitle}
              </Text>
            )}
            {title && (
              <Text className="text-white text-3xl font-extrabold tracking-tight leading-none mb-1">
                {title}
              </Text>
            )}
            {ctaLabel && (
              <TouchableOpacity
                style={{
                  backgroundColor: theme.colors.primary,
                  borderRadius: theme.radius.md,
                }}
                className="px-6 py-3 mt-2"
                activeOpacity={0.8}
              >
                <Text className="text-white font-semibold text-sm">{ctaLabel}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </SectionContainer>
  );
}
