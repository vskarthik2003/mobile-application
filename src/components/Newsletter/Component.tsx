import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../providers/ThemeProvider";
import { SectionContainer, SectionHeading, SectionCTA } from "../primitives";

import type { NewsletterProps } from "./types";

export function Newsletter({
  sectionId,
  title,
  subtitle,
  placeholder,
  buttonText,
  successMessage,
  bgColor,
}: NewsletterProps) {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (!email.trim() || !email.includes("@")) return;
    setSubscribed(true);
    setEmail("");
  };

  const bg = bgColor || theme.colors.surface;

  return (
    <SectionContainer sectionId={sectionId} paddingY="large" paddingX="medium">
      <View
        style={{
          backgroundColor: bg,
          borderRadius: theme.radius.lg,
          borderWidth: 1,
          borderColor: theme.colors.border,
        }}
        className="p-6 items-center text-center gap-3 w-full"
      >
        <Ionicons name="mail-open-outline" size={32} color={theme.colors.primary} className="opacity-80" />
        
        <View className="items-center gap-1">
          {subtitle && (
            <Text className="text-[10px] font-bold uppercase tracking-wider" style={{ color: theme.colors.primary }}>
              {subtitle}
            </Text>
          )}
          {title && (
            <Text className="text-xl font-bold tracking-tight" style={{ color: theme.colors.text }}>
              {title}
            </Text>
          )}
        </View>

        {subscribed ? (
          <View className="items-center py-2 gap-1.5">
            <Ionicons name="checkmark-circle" size={24} color="#10B981" />
            <Text className="text-xs font-semibold text-emerald-600">
              {successMessage}
            </Text>
          </View>
        ) : (
          <View className="w-full gap-2.5 mt-2">
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder={placeholder}
              placeholderTextColor={theme.colors.textMuted + "80"}
              keyboardType="email-address"
              autoCapitalize="none"
              style={{
                borderRadius: theme.radius.md,
                borderColor: theme.colors.border,
                borderWidth: 1,
                color: theme.colors.text,
                backgroundColor: theme.colors.background,
              }}
              className="w-full px-4 py-3 text-xs font-medium"
            />
            <TouchableOpacity
              onPress={handleSubscribe}
              style={{
                backgroundColor: theme.colors.primary,
                borderRadius: theme.radius.md,
              }}
              className="w-full py-3 items-center justify-center"
              activeOpacity={0.8}
            >
              <Text className="text-white text-xs font-bold">{buttonText}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SectionContainer>
  );
}
