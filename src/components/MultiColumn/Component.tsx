import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../providers/ThemeProvider";
import { SectionContainer, SectionHeading, SectionCTA } from "../primitives";

import type { MultiColumnProps } from "./types";

export function MultiColumn({
  sectionId,
  title,
  subtitle,
  columnCount,
  columns,
}: MultiColumnProps) {
  const { theme } = useTheme();

  const getColIcon = (iconName?: string) => {
    return (iconName || "checkmark-circle-outline") as any;
  };

  const cols = columns || [];

  return (
    <SectionContainer sectionId={sectionId} paddingY="medium" paddingX="medium">
      {title && (
        <SectionHeading title={title} subtitle={subtitle} alignment="center" />
      )}
      <View className="flex-row flex-wrap gap-4 justify-between mt-1">
        {cols.map((col, idx) => (
          <View
            key={col.id || idx}
            style={{
              width: columnCount === 3 ? "30%" : columnCount === 2 ? "47%" : "100%",
              backgroundColor: theme.colors.surface,
              borderRadius: theme.radius.md,
              borderWidth: 1,
              borderColor: theme.colors.border,
            }}
            className="p-4 items-center text-center gap-2"
          >
            <View
              className="w-10 h-10 items-center justify-center rounded-full bg-rose-50"
            >
              <Ionicons name={getColIcon(col.icon)} size={20} color={theme.colors.primary} />
            </View>
            <Text className="text-xs font-bold text-center mt-1" style={{ color: theme.colors.text }}>
              {col.title}
            </Text>
            {col.text && (
              <Text className="text-[10px] text-center font-medium leading-normal" style={{ color: theme.colors.textMuted }}>
                {col.text}
              </Text>
            )}
            {col.ctaLabel && (
              <Text className="text-[10px] font-bold text-center mt-1" style={{ color: theme.colors.primary }}>
                {col.ctaLabel}
              </Text>
            )}
          </View>
        ))}
      </View>
    </SectionContainer>
  );
}
