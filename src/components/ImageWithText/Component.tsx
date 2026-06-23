import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../providers/ThemeProvider";
import { SectionContainer, SectionHeading, SectionCTA } from "../primitives";

import type { ImageWithTextProps } from "./types";

export function ImageWithText({
  sectionId,
  imageUrl,
  imagePosition,
  title,
  text,
  ctaLabel,
  ctaUrl,
  bgColor,
}: ImageWithTextProps) {
  const { theme } = useTheme();
  const isImageLeft = imagePosition === "left";

  const cardBg = bgColor || theme.colors.surface;

  return (
    <SectionContainer sectionId={sectionId} paddingY="medium" paddingX="medium">
      <View
        style={{
          backgroundColor: cardBg,
          borderRadius: theme.radius.lg,
          borderWidth: 1,
          borderColor: theme.colors.border,
        }}
        className={`overflow-hidden flex-col ${isImageLeft ? "" : "flex-col-reverse"}`}
      >
        {/* Image portion */}
        <View className="w-full aspect-[4/3] bg-gray-50">
          <Image
            source={{ uri: imageUrl }}
            style={{ width: "100%", height: "100%" }}
            contentFit="cover"
          />
        </View>

        {/* Text portion */}
        <View className="p-6 gap-3">
          {title && (
            <Text className="text-xl font-bold tracking-tight" style={{ color: theme.colors.text }}>
              {title}
            </Text>
          )}
          {text && (
            <Text className="text-sm font-medium leading-relaxed" style={{ color: theme.colors.textMuted }}>
              {text}
            </Text>
          )}
          {ctaLabel && (
            <TouchableOpacity
              style={{
                backgroundColor: theme.colors.primary,
                borderRadius: theme.radius.md,
              }}
              className="px-5 py-2.5 mt-2 self-start"
              activeOpacity={0.8}
            >
              <Text className="text-white font-semibold text-xs">{ctaLabel}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SectionContainer>
  );
}
