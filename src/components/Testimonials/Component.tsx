import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../providers/ThemeProvider";
import { SectionContainer, SectionHeading, SectionCTA } from "../primitives";

import type { TestimonialsProps } from "./types";

export function Testimonials({
  sectionId,
  title,
  subtitle,
  bgColor,
  testimonials,
}: TestimonialsProps) {
  const { theme } = useTheme();
  const reviews = testimonials || [];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (reviews.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  if (reviews.length === 0) return null;
  const current = reviews[activeIndex];

  return (
    <SectionContainer sectionId={sectionId} bgColor={bgColor} paddingY="large" paddingX="medium">
      {title && <SectionHeading title={title} subtitle={subtitle} alignment="center" />}
      <View
        className="w-full p-6 items-center border border-gray-100 rounded-2xl bg-white shadow-sm gap-3 mt-1"
        style={{ borderRadius: theme.radius.lg }}
      >
        <Ionicons name="chatbubble-ellipses" size={32} color={theme.colors.primary} className="opacity-70" />
        
        {/* Rating Stars */}
        <View className="flex-row gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Ionicons
              key={i}
              name={i < current.rating ? "star" : "star-outline"}
              size={14}
              color="#F59E0B"
            />
          ))}
        </View>

        <Text className="text-sm italic text-center font-medium leading-relaxed" style={{ color: theme.colors.text }}>
          {`"${current.reviewText}"`}
        </Text>

        <View className="flex-row items-center gap-3 mt-3">
          {current.avatarUrl && (
            <Image
              source={{ uri: current.avatarUrl }}
              style={{ width: 36, height: 36, borderRadius: 18 }}
              contentFit="cover"
            />
          )}
          <View>
            <Text className="text-xs font-bold" style={{ color: theme.colors.text }}>
              {current.author}
            </Text>
            {current.title && (
              <Text className="text-[10px] font-semibold" style={{ color: theme.colors.textMuted }}>
                {current.title}
              </Text>
            )}
          </View>
        </View>

        {/* Carousel Dots */}
        {reviews.length > 1 && (
          <View className="flex-row gap-1.5 mt-3">
            {reviews.map((_, idx) => (
              <View
                key={idx}
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: idx === activeIndex ? theme.colors.primary : "#D1D5DB",
                }}
              />
            ))}
          </View>
        )}
      </View>
    </SectionContainer>
  );
}
