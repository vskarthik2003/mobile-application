import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../providers/ThemeProvider";

export interface SectionHeadingProps {
  title?: string;
  subtitle?: string;
  alignment?: "left" | "center";
  actionLabel?: string;
  onActionPress?: () => void;
}

export function SectionHeading({
  title,
  subtitle,
  alignment = "left",
  actionLabel,
  onActionPress,
}: SectionHeadingProps) {
  const { theme } = useTheme();

  if (!title && !subtitle) return null;

  const isCenter = alignment === "center";

  return (
    <View className="w-full flex-row items-end justify-between mb-4 px-1">
      <View className={`flex-1 ${isCenter ? "items-center text-center" : "items-start"}`}>
        {subtitle && (
          <Text
            className="text-xs uppercase tracking-widest font-semibold mb-1"
            style={{ color: theme.colors.primary }}
          >
            {subtitle}
          </Text>
        )}
        {title && (
          <Text
            className="text-xl font-bold tracking-tight"
            style={{ color: theme.colors.text }}
          >
            {title}
          </Text>
        )}
      </View>

      {actionLabel && onActionPress && !isCenter && (
        <TouchableOpacity
          onPress={onActionPress}
          className="flex-row items-center gap-0.5 pb-0.5"
          activeOpacity={0.7}
        >
          <Text
            className="text-xs font-semibold"
            style={{ color: theme.colors.primary }}
          >
            {actionLabel}
          </Text>
          <Ionicons name="chevron-forward" size={14} color={theme.colors.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
}
