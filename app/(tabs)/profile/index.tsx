import React from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "@/src/providers/AuthProvider";
import { useTheme } from "@/src/providers/ThemeProvider";
import { useCart } from "@/src/providers/CartProvider";
import { useWishlist } from "@/src/providers/WishlistProvider";

// ─── Menu Item ────────────────────────────────────────────────────────────────

function MenuItem({
  icon,
  label,
  badge,
  onPress,
  destructive,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  badge?: string | number;
  onPress: () => void;
  destructive?: boolean;
}) {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center px-4 py-4 gap-4"
      style={{ borderBottomColor: theme.colors.border, borderBottomWidth: 1 }}
      activeOpacity={0.7}
    >
      <View
        className="w-9 h-9 rounded-full items-center justify-center"
        style={{ backgroundColor: destructive ? "#FEE2E2" : theme.colors.surface }}
      >
        <Ionicons
          name={icon}
          size={18}
          color={destructive ? "#DC2626" : theme.colors.text}
        />
      </View>
      <Text
        className="flex-1 text-sm font-medium"
        style={{ color: destructive ? "#DC2626" : theme.colors.text }}
      >
        {label}
      </Text>
      {badge !== undefined && badge !== 0 && (
        <View className="bg-red-500 rounded-full px-2 py-0.5 mr-2">
          <Text className="text-white text-xs font-bold">{badge}</Text>
        </View>
      )}
      {!destructive && (
        <Ionicons name="chevron-forward" size={16} color={theme.colors.textMuted} />
      )}
    </TouchableOpacity>
  );
}

// ─── Profile Screen ──────────────────────────────────────────────────────────

export default function ProfileScreen() {
  const { isAuthenticated, customer, logout } = useAuth();
  const { theme } = useTheme();
  const { itemCount: cartCount } = useCart();
  const { itemCount: wishCount } = useWishlist();

  return (
    <View className="flex-1" style={{ backgroundColor: theme.colors.background }}>
      {/* Header */}
      <View
        className="px-4 py-4 border-b"
        style={{ borderColor: theme.colors.border }}
      >
        <Text className="text-xl font-bold" style={{ color: theme.colors.text }}>
          Profile
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Avatar / Account card */}
        <View
          className="mx-4 mt-4 p-5 rounded-2xl"
          style={{ backgroundColor: theme.colors.surface, borderRadius: theme.radius.lg }}
        >
          <View className="flex-row items-center gap-4">
            <View
              className="w-16 h-16 rounded-full items-center justify-center"
              style={{ backgroundColor: theme.colors.primary + "20" }}
            >
              <Text className="text-2xl font-bold" style={{ color: theme.colors.primary }}>
                {isAuthenticated ? customer!.firstName[0] : "G"}
              </Text>
            </View>
            <View className="flex-1">
              {isAuthenticated ? (
                <>
                  <Text className="text-base font-bold" style={{ color: theme.colors.text }}>
                    {customer!.firstName} {customer!.lastName}
                  </Text>
                  <Text className="text-sm" style={{ color: theme.colors.textMuted }}>
                    {customer!.email}
                  </Text>
                </>
              ) : (
                <>
                  <Text className="text-base font-bold" style={{ color: theme.colors.text }}>
                    Guest User
                  </Text>
                  <Text className="text-sm" style={{ color: theme.colors.textMuted }}>
                    Sign in to manage your account
                  </Text>
                </>
              )}
            </View>
          </View>

          {!isAuthenticated && (
            <TouchableOpacity
              onPress={() => router.push("/auth")}
              className="mt-4 py-3 rounded-xl items-center"
              style={{ backgroundColor: theme.colors.primary }}
              activeOpacity={0.85}
            >
              <Text className="text-white font-bold text-sm">Sign In / Register</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Quick Stats */}
        <View className="flex-row mx-4 mt-3 gap-3">
          {[
            { label: "Wishlist", value: wishCount, icon: "heart-outline" as const, onPress: () => router.push("/(tabs)/favorites") },
            { label: "Cart", value: cartCount, icon: "cart-outline" as const, onPress: () => router.push("/(tabs)/cart") },
          ].map((s) => (
            <TouchableOpacity
              key={s.label}
              onPress={s.onPress}
              className="flex-1 p-4 rounded-xl items-center gap-1"
              style={{
                backgroundColor: theme.colors.surface,
                borderRadius: theme.radius.lg,
                borderWidth: 1,
                borderColor: theme.colors.border,
              }}
              activeOpacity={0.8}
            >
              <Ionicons name={s.icon} size={22} color={theme.colors.primary} />
              <Text className="text-xl font-extrabold" style={{ color: theme.colors.text }}>
                {s.value}
              </Text>
              <Text className="text-xs" style={{ color: theme.colors.textMuted }}>
                {s.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Menu Groups */}
        <View
          className="mx-4 mt-4 rounded-2xl overflow-hidden border"
          style={{ borderColor: theme.colors.border, borderRadius: theme.radius.lg }}
        >
          <MenuItem icon="bag-outline" label="My Orders" onPress={() => router.push("/orders")} />
          <MenuItem icon="heart-outline" label="Wishlist" badge={wishCount} onPress={() => router.push("/(tabs)/favorites")} />
          <MenuItem icon="location-outline" label="Addresses" onPress={() => {}} />
        </View>

        <View
          className="mx-4 mt-3 rounded-2xl overflow-hidden border"
          style={{ borderColor: theme.colors.border, borderRadius: theme.radius.lg }}
        >
          <MenuItem icon="search-outline" label="Search" onPress={() => router.push("/search")} />
          <MenuItem icon="settings-outline" label="Settings" onPress={() => router.push("/settings")} />
          <MenuItem icon="help-circle-outline" label="Help & Support" onPress={() => {}} />
        </View>

        {isAuthenticated && (
          <View
            className="mx-4 mt-3 mb-6 rounded-2xl overflow-hidden border"
            style={{ borderColor: theme.colors.border, borderRadius: theme.radius.lg }}
          >
            <MenuItem
              icon="log-out-outline"
              label="Sign Out"
              onPress={logout}
              destructive
            />
          </View>
        )}

        <View className="h-8" />
      </ScrollView>
    </View>
  );
}
