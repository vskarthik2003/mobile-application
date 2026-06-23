import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../providers/ThemeProvider";
import { SectionContainer, SectionHeading, SectionCTA } from "../primitives";

import type { RichTextProps } from "./types";

export function RichText({
  sectionId,
  title,
  subtitle,
  content,
  alignment,
  ctaLabel,
  ctaUrl,
}: RichTextProps) {
  const { theme } = useTheme();
  const alignClass = alignment === "center" ? "items-center text-center" : alignment === "right" ? "items-end text-right" : "items-start text-left";

  return (
    <SectionContainer sectionId={sectionId} paddingY="medium" paddingX="medium">
      <View className={`gap-3 px-2 ${alignClass}`}>
        {subtitle && (
          <Text className="text-xs uppercase tracking-widest font-bold" style={{ color: theme.colors.primary }}>
            {subtitle}
          </Text>
        )}
        {title && (
          <Text className="text-2xl font-extrabold tracking-tight" style={{ color: theme.colors.text }}>
            {title}
          </Text>
        )}
        {content && (
          <Text className="text-sm font-medium leading-relaxed mt-1" style={{ color: theme.colors.textMuted }}>
            {content}
          </Text>
        )}
        {ctaLabel && ctaUrl && (
          <SectionCTA label={ctaLabel} variant="outline" size="small" style={{ marginTop: 8 }} />
        )}
      </View>
    </SectionContainer>
  );
}
