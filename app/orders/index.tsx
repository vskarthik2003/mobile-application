import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { useTheme } from "@/src/providers/ThemeProvider";

const MOCK_ORDERS = [
  { id: "ORD-1001", date: "Jun 12, 2026", status: "Delivered", total: 4500, items: 2 },
  { id: "ORD-1002", date: "Jun 15, 2026", status: "Shipped",   total: 2200, items: 1 },
  { id: "ORD-1003", date: "Jun 18, 2026", status: "Processing", total: 8900, items: 3 },
];

const STATUS_COLOR: Record<string, string> = {
  Delivered:  "#16A34A",
  Shipped:    "#2563EB",
  Processing: "#D97706",
  Cancelled:  "#DC2626",
};

export default function OrdersScreen() {
  const { theme } = useTheme();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "My Orders",
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerShadowVisible: false,
          headerBackTitle: "",
        }}
      />
      <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }} contentContainerStyle={{ padding: 16, gap: 12 }} showsVerticalScrollIndicator={false}>
        {MOCK_ORDERS.map((order) => (
          <View
            key={order.id}
            style={{
              backgroundColor: theme.colors.surface,
              borderRadius: theme.radius.lg,
              borderWidth: 1,
              borderColor: theme.colors.border,
              padding: 16,
              gap: 10,
            }}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
              <View style={{ gap: 2 }}>
                <Text style={{ color: theme.colors.text, fontWeight: "700", fontSize: 14 }}>{order.id}</Text>
                <Text style={{ color: theme.colors.textMuted, fontSize: 12 }}>{order.date}</Text>
              </View>
              <View style={{ backgroundColor: STATUS_COLOR[order.status] + "20", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 }}>
                <Text style={{ color: STATUS_COLOR[order.status], fontSize: 12, fontWeight: "700" }}>{order.status}</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", borderTopWidth: 1, borderColor: theme.colors.border, paddingTop: 10 }}>
              <Text style={{ color: theme.colors.textMuted, fontSize: 13 }}>{order.items} item{order.items > 1 ? "s" : ""}</Text>
              <Text style={{ color: theme.colors.text, fontWeight: "700", fontSize: 14 }}>₹{order.total.toLocaleString("en-IN")}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </>
  );
}
