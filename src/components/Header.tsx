import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

import { useTheme } from "@/src/providers/ThemeProvider";

type HeaderProps = {
  showSearch?: boolean;
  showCart?: boolean;
  showMenu?: boolean;
  sectionId?: string;
  layout?: "default" | "center-logo"
};
export function Header({
  showSearch = true,
  showCart = true,
  showMenu = true,
  layout = "default",
}: HeaderProps) {
  const { theme, branding } = useTheme();

  if (layout === "center-logo") {
    return (
      <View
        className="flex-row items-center justify-between px-5 py-4"
        style={{ backgroundColor: theme.colors.background }}
      >
        {/* Left */}
        <View className="w-10">
          {showMenu && (
            <TouchableOpacity>
              <Ionicons name="menu" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          )}
        </View>

        {/* Center Logo */}
        <Text
          className="text-xl font-bold"
          style={{ color: theme.colors.primary }}
        >
          {branding.appName}
        </Text>

        {/* Right */}
        <View className="flex-row items-center gap-4 w-16 justify-end">
          {showSearch && (
            <TouchableOpacity>
              <Ionicons name="search" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          )}

          {showCart && (
            <TouchableOpacity>
              <Ionicons
                name="cart-outline"
                size={24}
                color={theme.colors.text}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  return (
    <View
      className="flex-row items-center justify-between px-5 py-4"
      style={{ backgroundColor: theme.colors.background }}
    >
      <Text
        className="text-xl font-bold"
        style={{ color: theme.colors.primary }}
      >
        {branding.appName}
      </Text>

      <View className="flex-row items-center gap-4">
        {showSearch && (
          <TouchableOpacity>
            <Ionicons name="search" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        )}

        {showMenu && (
          <TouchableOpacity>
            <Ionicons name="menu" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        )}

        {showCart && (
          <TouchableOpacity>
            <Ionicons name="cart-outline" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
