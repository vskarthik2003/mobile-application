import React, { useState } from "react";
import { View, Text, ScrollView, Switch, TouchableOpacity } from "react-native";
import { Stack } from "expo-router";
import { useTheme } from "@/src/providers/ThemeProvider";

export default function SettingsScreen() {
  const { theme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [marketing, setMarketing] = useState(false);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Settings",
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerShadowVisible: false,
          headerBackTitle: "",
        }}
      />
      <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }} contentContainerStyle={{ padding: 16, gap: 16 }} showsVerticalScrollIndicator={false}>
        {/* Notifications */}
        <View style={{ backgroundColor: theme.colors.surface, borderRadius: theme.radius.lg, borderWidth: 1, borderColor: theme.colors.border, overflow: "hidden" }}>
          <View style={{ padding: 16, borderBottomWidth: 1, borderColor: theme.colors.border }}>
            <Text style={{ color: theme.colors.text, fontWeight: "700", fontSize: 13, textTransform: "uppercase", letterSpacing: 0.8 }}>Notifications</Text>
          </View>
          {[
            { label: "Push Notifications", value: notifications, toggle: setNotifications },
            { label: "Marketing Emails", value: marketing, toggle: setMarketing },
          ].map((item, i) => (
            <View key={i} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderColor: theme.colors.border }}>
              <Text style={{ color: theme.colors.text, fontSize: 14 }}>{item.label}</Text>
              <Switch
                value={item.value}
                onValueChange={item.toggle}
                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                thumbColor="#fff"
              />
            </View>
          ))}
        </View>

        {/* App Info */}
        <View style={{ backgroundColor: theme.colors.surface, borderRadius: theme.radius.lg, borderWidth: 1, borderColor: theme.colors.border, overflow: "hidden" }}>
          <View style={{ padding: 16, borderBottomWidth: 1, borderColor: theme.colors.border }}>
            <Text style={{ color: theme.colors.text, fontWeight: "700", fontSize: 13, textTransform: "uppercase", letterSpacing: 0.8 }}>App</Text>
          </View>
          {[
            { label: "Version", value: "1.0.0" },
            { label: "SDK", value: "Expo 54" },
          ].map((row, i) => (
            <View key={i} style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderColor: theme.colors.border }}>
              <Text style={{ color: theme.colors.text, fontSize: 14 }}>{row.label}</Text>
              <Text style={{ color: theme.colors.textMuted, fontSize: 14 }}>{row.value}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
}
