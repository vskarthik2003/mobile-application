import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../providers/ThemeProvider";
import { SectionContainer, SectionHeading, SectionCTA } from "../primitives";

import type { FooterProps } from "./types";

export function Footer({
  sectionId,
  text,
  showSocials,
  copyrightText,
  paymentIcons,
}: FooterProps) {
  const { theme, branding } = useTheme();
  const paymentIconsList = paymentIcons || [];

  return (
    <SectionContainer sectionId={sectionId} paddingY="large" paddingX="medium">
      <View className="w-full gap-6">
        {/* Brand section */}
        <View className="gap-2 items-center text-center">
          <Text className="text-lg font-bold" style={{ color: theme.colors.primary }}>
            {branding.appName}
          </Text>
          {text && (
            <Text className="text-xs text-center leading-relaxed font-semibold px-4" style={{ color: theme.colors.textMuted }}>
              {text}
            </Text>
          )}
        </View>

        {/* Social media connections */}
        {showSocials && (
          <View className="flex-row justify-center gap-5 mt-1">
            {["logo-instagram", "logo-facebook", "logo-twitter", "logo-youtube"].map((social) => (
              <TouchableOpacity key={social} activeOpacity={0.6}>
                <Ionicons name={social as any} size={20} color={theme.colors.text} />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Divider */}
        <View className="h-[1px] w-full" style={{ backgroundColor: theme.colors.border }} />

        {/* Legal & Payment icons */}
        <View className="flex-col gap-4 items-center">
          {paymentIconsList.length > 0 && (
            <View className="flex-row gap-3">
              {paymentIconsList.map((icon, idx) => (
                <Ionicons key={idx} name={icon as any} size={24} color={theme.colors.textMuted} />
              ))}
            </View>
          )}

          {copyrightText && (
            <Text className="text-[10px] text-center font-medium" style={{ color: theme.colors.textMuted }}>
              {copyrightText}
            </Text>
          )}
        </View>
      </View>
    </SectionContainer>
  );
}
