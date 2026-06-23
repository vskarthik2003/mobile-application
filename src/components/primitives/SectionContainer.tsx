import React, { type ReactNode } from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import { useTheme } from "../../providers/ThemeProvider";
import { SkeletonLoader } from "./SkeletonLoader";
import { ErrorState } from "./ErrorState";

export interface SectionContainerProps {
  sectionId?: string;
  loading?: boolean;
  error?: Error | string | null;
  onRetry?: () => void;
  bgColor?: string;
  paddingY?: "none" | "small" | "medium" | "large";
  paddingX?: "none" | "small" | "medium" | "large";
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}

export function SectionContainer({
  sectionId,
  loading = false,
  error = null,
  onRetry,
  bgColor,
  paddingY = "medium",
  paddingX = "medium",
  style,
  children,
}: SectionContainerProps) {
  const { theme } = useTheme();

  // Spacing maps
  const pyMap = {
    none: "py-0",
    small: "py-2",
    medium: "py-4",
    large: "py-8",
  };

  const pxMap = {
    none: "px-0",
    small: "px-2",
    medium: "px-4",
    large: "px-6",
  };

  const containerBgColor = bgColor || theme.colors.background;

  const contentClass = `${pyMap[paddingY]} ${pxMap[paddingX]}`;

  return (
    <View
      id={sectionId}
      style={[{ backgroundColor: containerBgColor }, style]}
      className="w-full"
    >
      <View className={contentClass}>
        {loading ? (
          <SkeletonLoader />
        ) : error ? (
          <ErrorState
            message={error instanceof Error ? error.message : error}
            onRetry={onRetry}
          />
        ) : (
          children
        )}
      </View>
    </View>
  );
}
