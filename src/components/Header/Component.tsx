import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../providers/ThemeProvider";
import { SectionContainer, SectionHeading, SectionCTA } from "../primitives";

import type { HeaderProps } from "./types";

export function Header({
  sectionId,
  logoUrl,
  showSearch,
  showCart,
  showMenu,
  layout,
}: HeaderProps) {
  const { theme, branding } = useTheme();

  const isCenterLogo = layout === "center-logo";

  return (
    <View
      style={{ backgroundColor: theme.colors.background, borderBottomWidth: 1, borderBottomColor: theme.colors.border }}
      className="flex-row items-center justify-between px-5 py-4 w-full"
    >
      {/* Left Icon */}
      <View className="w-10">
        {showMenu && (
          <TouchableOpacity activeOpacity={0.7}>
            <Ionicons name="menu-outline" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        )}
      </View>

      {/* Brand logo/name */}
      <View className={`flex-1 ${isCenterLogo ? "items-center" : "items-start"}`}>
        {logoUrl || branding.logoUrl ? (
          <Image
            source={{ uri: logoUrl || branding.logoUrl }}
            style={{ height: 28, width: 120 }}
            contentFit="contain"
          />
        ) : (
          <Text className="text-xl font-bold italic tracking-tight" style={{ color: theme.colors.primary }}>
            {branding.appName}
          </Text>
        )}
      </View>

      {/* Right icons */}
      <View className="flex-row items-center gap-4 w-16 justify-end">
        {showSearch && (
          <TouchableOpacity activeOpacity={0.7}>
            <Ionicons name="search-outline" size={22} color={theme.colors.text} />
          </TouchableOpacity>
        )}
        {showCart && (
          <TouchableOpacity activeOpacity={0.7} className="relative">
            <Ionicons name="bag-outline" size={22} color={theme.colors.text} />
            <View
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full items-center justify-center"
              style={{ backgroundColor: theme.colors.primary }}
            >
              <Text className="text-[8px] font-bold text-white">0</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
