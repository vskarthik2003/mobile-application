import React from "react";
import { TouchableOpacity, Text, type StyleProp, type ViewStyle } from "react-native";
import { useTheme } from "../../providers/ThemeProvider";

export interface SectionCTAProps {
  label: string;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "outline" | "text";
  fullWidth?: boolean;
  size?: "small" | "medium" | "large";
  style?: StyleProp<ViewStyle>;
}

export function SectionCTA({
  label,
  onPress,
  variant = "primary",
  fullWidth = false,
  size = "medium",
  style,
}: SectionCTAProps) {
  const { theme } = useTheme();

  // Size configurations
  const paddingMap = {
    small: "px-3 py-1.5 text-xs",
    medium: "px-5 py-3 text-sm",
    large: "px-7 py-4 text-base",
  };

  const textStyleMap = {
    small: "text-xs font-semibold",
    medium: "text-sm font-semibold",
    large: "text-base font-bold",
  };

  // Base background and border styling based on variant
  let btnStyle: ViewStyle = {
    borderRadius: theme.radius.md,
  };

  let textColor = "#FFFFFF";

  if (variant === "primary") {
    btnStyle.backgroundColor = theme.colors.primary;
  } else if (variant === "secondary") {
    btnStyle.backgroundColor = theme.colors.surface;
    btnStyle.borderWidth = 1;
    btnStyle.borderColor = theme.colors.border;
    textColor = theme.colors.text;
  } else if (variant === "outline") {
    btnStyle.backgroundColor = "transparent";
    btnStyle.borderWidth = 1;
    btnStyle.borderColor = theme.colors.primary;
    textColor = theme.colors.primary;
  } else if (variant === "text") {
    btnStyle.backgroundColor = "transparent";
    textColor = theme.colors.primary;
  }

  const containerClass = `items-center justify-center flex-row ${
    fullWidth ? "w-full" : "self-start"
  } ${size === "small" ? "py-2 px-4" : size === "large" ? "py-4 px-8" : "py-3 px-6"}`;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[btnStyle, style]}
      className={containerClass}
      activeOpacity={0.8}
    >
      <Text className={`${textStyleMap[size]} text-center`} style={{ color: textColor }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
