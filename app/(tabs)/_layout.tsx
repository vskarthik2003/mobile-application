import React, { useMemo } from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import { useAppConfig } from "@/src/providers/AppConfigProvider";
import { useTheme } from "@/src/providers/ThemeProvider";
import { useCart } from "@/src/providers/CartProvider";
import { useWishlist } from "@/src/providers/WishlistProvider";

// ─── Tab icon mapping ────────────────────────────────────────────────────────

const ICON_MAP: Record<string, { active: keyof typeof Ionicons.glyphMap; inactive: keyof typeof Ionicons.glyphMap }> = {
  "home-outline":    { active: "home",       inactive: "home-outline" },
  "grid-outline":    { active: "grid",       inactive: "grid-outline" },
  "heart-outline":   { active: "heart",      inactive: "heart-outline" },
  "cart-outline":    { active: "cart",       inactive: "cart-outline" },
  "person-outline":  { active: "person",     inactive: "person-outline" },
  "search-outline":  { active: "search",     inactive: "search-outline" },
  "star-outline":    { active: "star",       inactive: "star-outline" },
};

function resolveIcon(icon: string, focused: boolean): keyof typeof Ionicons.glyphMap {
  const pair = ICON_MAP[icon] ?? { active: icon as any, inactive: icon as any };
  return focused ? pair.active : pair.inactive;
}

// ─── Badge Component ─────────────────────────────────────────────────────────

function Badge({ count }: { count: number }) {
  const { theme } = useTheme();
  if (count <= 0) return null;
  return (
    <View
      style={{
        position: "absolute",
        top: -4,
        right: -8,
        backgroundColor: theme.colors.primary,
        borderRadius: 10,
        minWidth: 18,
        height: 18,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 4,
        zIndex: 10,
      }}
    >
      <Text style={{ color: "#fff", fontSize: 10, fontWeight: "700" }}>
        {count > 99 ? "99+" : count}
      </Text>
    </View>
  );
}

// ─── Layout ──────────────────────────────────────────────────────────────────

export default function TabsLayout() {
  const { config } = useAppConfig();
  const { theme } = useTheme();
  const { itemCount: cartCount } = useCart();
  const { itemCount: wishCount } = useWishlist();

  // Sort tabs by `order`, filter visible ones
  const tabs = useMemo(
    () =>
      [...config.navigation]
        .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
        .filter((t) => t.visible !== false),
    [config.navigation]
  );

  // All possible tab IDs we expose routes for — hidden tabs get href: null
  const ALL_TAB_IDS = ["home", "collections", "favorites", "cart", "profile"];
  const visibleIds = new Set(tabs.map((t) => t.id));

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          paddingBottom: 6,
          paddingTop: 6,
          height: 64,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600", marginTop: 2 },
      }}
    >
      {ALL_TAB_IDS.map((id) => {
        const tabDef = tabs.find((t) => t.id === id);
        const hidden = !visibleIds.has(id);

        return (
          <Tabs.Screen
            key={id}
            name={id}
            options={{
              title: tabDef?.title ?? id,
              href: hidden ? null : undefined,
              tabBarIcon: ({ focused, color, size }) => {
                const iconName = resolveIcon(tabDef?.icon ?? `${id}-outline`, focused);
                const badge = id === "cart" ? cartCount : id === "favorites" ? wishCount : 0;
                return (
                  <View>
                    <Ionicons name={iconName} size={size} color={color} />
                    <Badge count={badge} />
                  </View>
                );
              },
            }}
          />
        );
      })}
    </Tabs>
  );
}
