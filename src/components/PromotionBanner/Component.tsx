import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../providers/ThemeProvider";
import { SectionContainer, SectionHeading, SectionCTA } from "../primitives";

import type { PromotionBannerProps } from "./types";

export function PromotionBanner({
  sectionId,
  title,
  description,
  badgeText,
  discountCode,
  bgColor,
  textColor,
  imageUrl,
}: PromotionBannerProps) {
  const { theme } = useTheme();

  return (
    <SectionContainer sectionId={sectionId} paddingY="medium" paddingX="medium">
      <View
        style={{
          backgroundColor: bgColor,
          borderRadius: theme.radius.lg,
        }}
        className="w-full relative overflow-hidden flex-row p-6 items-center justify-between"
      >
        <View className="flex-1 gap-2.5 z-10">
          {badgeText && (
            <View className="bg-white/20 self-start px-2 py-0.5 rounded">
              <Text className="text-[10px] font-bold tracking-wider" style={{ color: textColor }}>
                {badgeText}
              </Text>
            </View>
          )}
          {title && (
            <Text className="text-2xl font-black tracking-tight" style={{ color: textColor }}>
              {title}
            </Text>
          )}
          {description && (
            <Text className="text-xs font-semibold opacity-90 leading-normal" style={{ color: textColor }}>
              {description}
            </Text>
          )}

          {discountCode && (
            <View className="flex-row items-center gap-2 mt-2 bg-black/15 self-start px-3 py-1.5 rounded-lg border border-white/20">
              <Text className="text-xs font-bold tracking-widest font-mono" style={{ color: textColor }}>
                {discountCode}
              </Text>
              <TouchableOpacity activeOpacity={0.6}>
                <Ionicons name="copy-outline" size={14} color={textColor} />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {imageUrl ? (
          <View className="w-24 h-24 rounded-lg overflow-hidden ml-4">
            <Image source={{ uri: imageUrl }} style={{ width: "100%", height: "100%" }} contentFit="cover" />
          </View>
        ) : null}
      </View>
    </SectionContainer>
  );
}
