import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useAppConfig } from "@/src/providers/AppConfigProvider";
import { useTheme } from "@/src/providers/ThemeProvider";

const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  "home-outline": "home-outline",
  "grid-outline": "grid-outline",
  "person-outline": "person-outline",
  "cart-outline": "cart-outline",
  "heart-outline": "heart-outline",
};

const activeIconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  "home-outline": "home",
  "grid-outline": "grid",
  "person-outline": "person",
  "cart-outline": "cart",
  "heart-outline": "heart",
};

export function DynamicTabBar() {
  const insets = useSafeAreaInsets();
  const { config, activePageId, setActivePageId } = useAppConfig();
  const { theme } = useTheme();

  const tabs = config.navigation.filter((item) => item.visible);

  return (
    <View
      className="flex-row border-t px-2 pt-2"
      style={{
        backgroundColor: theme.colors.background,
        borderTopColor: theme.colors.border,
        paddingBottom: Math.max(insets.bottom, 8),
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activePageId;
        const iconName = isActive
          ? (activeIconMap[tab.icon] ?? "ellipse")
          : (iconMap[tab.icon] ?? "ellipse-outline");

        return (
          <TouchableOpacity
            key={tab.id}
            className="flex-1 items-center py-2"
            onPress={() => setActivePageId(tab.id)}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
          >
            <Ionicons
              name={iconName}
              size={24}
              color={isActive ? theme.colors.primary : theme.colors.textMuted}
            />
            <Text
              className="text-xs mt-1 font-medium"
              style={{
                color: isActive ? theme.colors.primary : theme.colors.textMuted,
              }}
            >
              {tab.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
