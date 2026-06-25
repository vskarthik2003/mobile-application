import React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useCart } from "@/src/providers/CartProvider";
import { useTheme } from "@/src/providers/ThemeProvider";

export default function CartScreen() {
  const { items, itemCount, subtotal, currencyCode, removeFromCart, updateQuantity, clearCart } =
    useCart();
  const { theme } = useTheme();

  const fmt = (amount: number) =>
    `₹${amount.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;

  return (
    <View className="flex-1" style={{ backgroundColor: theme.colors.background }}>
      {/* Header */}
      <View
        className="flex-row items-center justify-between px-4 py-4 border-b"
        style={{ borderColor: theme.colors.border }}
      >
        <Text className="text-xl font-bold" style={{ color: theme.colors.text }}>
          My Cart
        </Text>
        {itemCount > 0 && (
          <TouchableOpacity onPress={clearCart} activeOpacity={0.7}>
            <Text className="text-sm font-medium" style={{ color: theme.colors.primary }}>
              Clear All
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {itemCount === 0 ? (
        /* Empty cart */
        <View className="flex-1 items-center justify-center gap-4 px-8">
          <View
            className="w-20 h-20 rounded-full items-center justify-center"
            style={{ backgroundColor: theme.colors.surface }}
          >
            <Ionicons name="cart-outline" size={36} color={theme.colors.textMuted} />
          </View>
          <Text className="text-lg font-bold text-center" style={{ color: theme.colors.text }}>
            Your cart is empty
          </Text>
          <Text className="text-sm text-center" style={{ color: theme.colors.textMuted }}>
            Looks like you haven&apos;t added anything yet. Start exploring our collections!
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/collections")}
            className="mt-2 px-8 py-3 rounded-full"
            style={{ backgroundColor: theme.colors.primary }}
            activeOpacity={0.85}
          >
            <Text className="text-white font-bold text-sm">Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ padding: 16, gap: 12 }}
            showsVerticalScrollIndicator={false}
          >
            {items.map((item) => (
              <View
                key={item.lineId}
                className="flex-row gap-3 p-3 rounded-xl border"
                style={{
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                  borderRadius: theme.radius.lg,
                }}
              >
                {/* Image */}
                <View
                  className="rounded-lg overflow-hidden bg-gray-100"
                  style={{ width: 84, height: 84, borderRadius: theme.radius.md }}
                >
                  {item.imageUrl ? (
                    <Image
                      source={{ uri: item.imageUrl }}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="cover"
                    />
                  ) : (
                    <View className="flex-1 items-center justify-center">
                      <Ionicons name="image-outline" size={24} color={theme.colors.textMuted} />
                    </View>
                  )}
                </View>

                {/* Details */}
                <View className="flex-1 gap-1">
                  <Text
                    className="text-sm font-semibold"
                    numberOfLines={2}
                    style={{ color: theme.colors.text }}
                  >
                    {item.title}
                  </Text>
                  {item.variantTitle !== "Default Title" && (
                    <Text className="text-xs" style={{ color: theme.colors.textMuted }}>
                      {item.variantTitle}
                    </Text>
                  )}
                  <Text className="text-sm font-bold" style={{ color: theme.colors.primary }}>
                    {fmt(item.price * item.quantity)}
                  </Text>

                  {/* Quantity stepper */}
                  <View className="flex-row items-center gap-2 mt-1">
                    <TouchableOpacity
                      onPress={() => updateQuantity(item.lineId, item.quantity - 1)}
                      className="w-7 h-7 rounded-full border items-center justify-center"
                      style={{ borderColor: theme.colors.border }}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="remove" size={14} color={theme.colors.text} />
                    </TouchableOpacity>
                    <Text className="w-6 text-center text-sm font-bold" style={{ color: theme.colors.text }}>
                      {item.quantity}
                    </Text>
                    <TouchableOpacity
                      onPress={() => updateQuantity(item.lineId, item.quantity + 1)}
                      className="w-7 h-7 rounded-full border items-center justify-center"
                      style={{ borderColor: theme.colors.border }}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="add" size={14} color={theme.colors.text} />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Remove */}
                <TouchableOpacity
                  onPress={() => removeFromCart(item.lineId)}
                  className="p-1 self-start"
                  activeOpacity={0.7}
                >
                  <Ionicons name="trash-outline" size={18} color={theme.colors.textMuted} />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          {/* Footer — Order Summary */}
          <View
            className="px-4 py-5 border-t gap-3"
            style={{
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.background,
            }}
          >
            <View className="flex-row justify-between">
              <Text className="text-sm" style={{ color: theme.colors.textMuted }}>
                Subtotal ({itemCount} items)
              </Text>
              <Text className="text-sm font-semibold" style={{ color: theme.colors.text }}>
                {fmt(subtotal)}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm" style={{ color: theme.colors.textMuted }}>
                Delivery
              </Text>
              <Text className="text-sm font-semibold" style={{ color: "#16A34A" }}>
                FREE
              </Text>
            </View>
            <View
              className="border-t pt-3 flex-row justify-between"
              style={{ borderColor: theme.colors.border }}
            >
              <Text className="text-base font-bold" style={{ color: theme.colors.text }}>
                Total
              </Text>
              <Text className="text-base font-extrabold" style={{ color: theme.colors.text }}>
                {fmt(subtotal)}
              </Text>
            </View>

            <TouchableOpacity
              className="py-4 rounded-2xl items-center mt-1"
              style={{ backgroundColor: theme.colors.primary }}
              activeOpacity={0.85}
            >
              <Text className="text-white font-bold text-base tracking-wide">
                Proceed to Checkout
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}
