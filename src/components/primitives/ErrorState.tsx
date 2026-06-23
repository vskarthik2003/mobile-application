import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../providers/ThemeProvider";

export interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message = "Something went wrong.", onRetry }: ErrorStateProps) {
  const { theme } = useTheme();

  return (
    <View className="w-full py-8 px-4 items-center justify-center border border-dashed border-red-200 rounded-xl bg-red-50/30">
      <Ionicons name="alert-circle-outline" size={40} color="#EF4444" />
      <Text className="mt-2 text-sm font-medium text-center" style={{ color: theme.colors.text }}>
        {message}
      </Text>
      {onRetry && (
        <TouchableOpacity
          onPress={onRetry}
          style={{
            backgroundColor: theme.colors.primary,
            borderRadius: theme.radius.md,
          }}
          className="mt-4 px-4 py-2 flex-row items-center gap-1.5"
          activeOpacity={0.8}
        >
          <Ionicons name="refresh" size={16} color="#FFFFFF" />
          <Text className="text-white text-xs font-semibold">Retry</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
