import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../providers/ThemeProvider";

export interface EmptyStateProps {
  title?: string;
  description?: string;
  iconName?: keyof typeof Ionicons.name | string;
}

export function EmptyState({
  title = "No items found",
  description = "Check back later or try adjusting filters.",
  iconName = "cube-outline",
}: EmptyStateProps) {
  const { theme } = useTheme();

  return (
    <View className="w-full py-12 px-6 items-center justify-center rounded-xl bg-transparent">
      <Ionicons name={iconName as any} size={48} color={theme.colors.textMuted} />
      <Text className="mt-4 text-base font-bold text-center" style={{ color: theme.colors.text }}>
        {title}
      </Text>
      <Text className="mt-1 text-sm text-center font-medium" style={{ color: theme.colors.textMuted }}>
        {description}
      </Text>
    </View>
  );
}
