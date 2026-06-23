import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../providers/ThemeProvider";
import { SectionContainer, SectionHeading, SectionCTA } from "../primitives";

import type { AnnouncementBarProps } from "./types";

export function AnnouncementBar({
  sectionId,
  messages,
  bgColor,
  textColor,
  autoPlay,
  timeGap,
}: AnnouncementBarProps) {
  const announcements = messages || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay || announcements.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, (timeGap ?? 3) * 1000);

    return () => clearInterval(interval);
  }, [timeGap, autoPlay, announcements.length]);

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  if (announcements.length === 0) return null;

  return (
    <View
      style={{ backgroundColor: bgColor }}
      className="flex-row items-center justify-between px-4 py-2.5 w-full shadow-sm"
    >
      <TouchableOpacity onPress={goPrev} activeOpacity={0.7} className="p-1">
        <Ionicons name="chevron-back" size={16} color={textColor} />
      </TouchableOpacity>

      <Text
        className="flex-1 text-center text-xs font-semibold tracking-wide"
        style={{ color: textColor }}
      >
        {announcements[currentIndex]}
      </Text>

      <TouchableOpacity onPress={goNext} activeOpacity={0.7} className="p-1">
        <Ionicons name="chevron-forward" size={16} color={textColor} />
      </TouchableOpacity>
    </View>
  );
}
