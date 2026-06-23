import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../providers/ThemeProvider";
import { SectionContainer, SectionHeading, SectionCTA } from "../primitives";

import type { SlideshowProps } from "./types";

export function Slideshow({
  sectionId,
  autoPlay,
  interval,
  slides,
}: SlideshowProps) {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const slidesList = slides || [];

  useEffect(() => {
    if (!autoPlay || slidesList.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slidesList.length);
    }, (interval ?? 5) * 1000);
    return () => clearInterval(timer);
  }, [autoPlay, interval, slidesList.length]);

  if (slidesList.length === 0) return null;
  const current = slidesList[activeIndex];

  return (
    <SectionContainer sectionId={sectionId} paddingY="none" paddingX="none">
      <View className="relative w-full aspect-[16/10] bg-gray-950">
        <Image
          source={{ uri: current.imageUrl }}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
        />
        {/* Dark overlay */}
        <View className="absolute inset-0 bg-black/35 justify-end p-6">
          <View className="gap-2 items-start self-start">
            {current.subtitle && (
              <Text className="text-white/90 text-[10px] font-bold uppercase tracking-wider">
                {current.subtitle}
              </Text>
            )}
            {current.title && (
              <Text className="text-white text-xl font-extrabold tracking-tight leading-tight">
                {current.title}
              </Text>
            )}
            {current.ctaLabel && (
              <TouchableOpacity
                style={{
                  backgroundColor: theme.colors.primary,
                  borderRadius: theme.radius.md,
                }}
                className="px-4 py-2 mt-1"
                activeOpacity={0.8}
              >
                <Text className="text-white font-bold text-[10px]">{current.ctaLabel}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Carousel indicator dots */}
        {slidesList.length > 1 && (
          <View className="absolute top-4 right-4 flex-row gap-1 bg-black/25 px-2.5 py-1 rounded-full">
            {slidesList.map((_, idx) => (
              <View
                key={idx}
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: idx === activeIndex ? theme.colors.primary : "#FFFFFF80",
                }}
              />
            ))}
          </View>
        )}
      </View>
    </SectionContainer>
  );
}
