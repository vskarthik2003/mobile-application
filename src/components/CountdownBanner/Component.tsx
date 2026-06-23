import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../providers/ThemeProvider";
import { SectionContainer, SectionHeading, SectionCTA } from "../primitives";

import type { CountdownBannerProps } from "./types";

export function CountdownBanner({
  sectionId,
  title,
  subtitle,
  targetDate,
  imageUrl,
  bgColor,
  textColor,
  ctaLabel,
  ctaUrl,
}: CountdownBannerProps) {
  const { theme } = useTheme();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(targetDate || new Date().toISOString()).getTime();
    
    const updateTime = () => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const bg = bgColor || theme.colors.primary;
  const textCol = textColor || "#FFFFFF";

  const renderTimerBlock = (val: number, label: string) => (
    <View className="items-center bg-black/15 px-3 py-2 rounded-lg min-w-[50px]">
      <Text className="text-base font-black tracking-tight" style={{ color: textCol }}>
        {String(val).padStart(2, "0")}
      </Text>
      <Text className="text-[8px] font-bold uppercase opacity-80" style={{ color: textCol }}>
        {label}
      </Text>
    </View>
  );

  return (
    <SectionContainer sectionId={sectionId} paddingY="medium" paddingX="medium">
      <View
        style={{
          backgroundColor: bg,
          borderRadius: theme.radius.lg,
        }}
        className="w-full overflow-hidden flex-col relative"
      >
        {imageUrl ? (
          <View className="w-full aspect-[16/7] bg-gray-50">
            <Image source={{ uri: imageUrl }} style={{ width: "100%", height: "100%" }} contentFit="cover" />
            <View className="absolute inset-0 bg-black/50" />
          </View>
        ) : null}

        <View className={`p-6 gap-4 w-full ${imageUrl ? "absolute inset-0 justify-center items-center" : "items-center"}`}>
          <View className="items-center gap-1">
            {subtitle && (
              <Text className="text-[10px] uppercase font-bold tracking-widest" style={{ color: textCol }}>
                {subtitle}
              </Text>
            )}
            {title && (
              <Text className="text-xl font-extrabold tracking-tight text-center" style={{ color: textCol }}>
                {title}
              </Text>
            )}
          </View>

          {/* Live Timer */}
          <View className="flex-row gap-2">
            {renderTimerBlock(timeLeft.days, "Days")}
            {renderTimerBlock(timeLeft.hours, "Hrs")}
            {renderTimerBlock(timeLeft.minutes, "Mins")}
            {renderTimerBlock(timeLeft.seconds, "Secs")}
          </View>

          {ctaLabel && ctaUrl && (
            <TouchableOpacity
              className="bg-white/20 border border-white/40 px-5 py-2.5 rounded-lg mt-1"
              style={{ borderRadius: theme.radius.md }}
              activeOpacity={0.8}
            >
              <Text className="text-xs font-bold" style={{ color: textCol }}>{ctaLabel}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SectionContainer>
  );
}
