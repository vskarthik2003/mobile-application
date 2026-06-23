import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import { useTheme } from "../../providers/ThemeProvider";

export interface SkeletonLoaderProps {
  type?: "card" | "hero" | "text" | "list" | "default";
}

export function SkeletonLoader({ type = "default" }: SkeletonLoaderProps) {
  const { theme } = useTheme();
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  const skeletonColor = theme.colors.surface;

  if (type === "card") {
    return (
      <View className="w-full flex-row gap-4 p-2 justify-center">
        {[1, 2].map((i) => (
          <View key={i} className="flex-1 rounded-xl overflow-hidden bg-transparent border border-gray-100 p-2">
            <Animated.View
              style={{ backgroundColor: skeletonColor, opacity, height: 180 }}
              className="w-full rounded-lg mb-3"
            />
            <Animated.View
              style={{ backgroundColor: skeletonColor, opacity, height: 16 }}
              className="w-3/4 rounded mb-2"
            />
            <Animated.View
              style={{ backgroundColor: skeletonColor, opacity, height: 12 }}
              className="w-1/2 rounded"
            />
          </View>
        ))}
      </View>
    );
  }

  if (type === "hero") {
    return (
      <View className="w-full rounded-2xl overflow-hidden p-4">
        <Animated.View
          style={{ backgroundColor: skeletonColor, opacity, height: 260 }}
          className="w-full rounded-xl justify-end p-6"
        >
          <Animated.View
            style={{ backgroundColor: theme.colors.background, opacity: 0.2, height: 24 }}
            className="w-2/3 rounded mb-3"
          />
          <Animated.View
            style={{ backgroundColor: theme.colors.background, opacity: 0.2, height: 16 }}
            className="w-1/2 rounded mb-4"
          />
          <Animated.View
            style={{ backgroundColor: theme.colors.background, opacity: 0.2, height: 40 }}
            className="w-28 rounded-lg"
          />
        </Animated.View>
      </View>
    );
  }

  if (type === "text") {
    return (
      <View className="w-full p-4 gap-3">
        <Animated.View
          style={{ backgroundColor: skeletonColor, opacity, height: 24 }}
          className="w-1/3 rounded"
        />
        <Animated.View
          style={{ backgroundColor: skeletonColor, opacity, height: 14 }}
          className="w-full rounded"
        />
        <Animated.View
          style={{ backgroundColor: skeletonColor, opacity, height: 14 }}
          className="w-5/6 rounded"
        />
        <Animated.View
          style={{ backgroundColor: skeletonColor, opacity, height: 14 }}
          className="w-2/3 rounded"
        />
      </View>
    );
  }

  if (type === "list") {
    return (
      <View className="w-full p-4 gap-4">
        {[1, 2, 3].map((i) => (
          <View key={i} className="flex-row items-center gap-4">
            <Animated.View
              style={{ backgroundColor: skeletonColor, opacity, height: 60, width: 60 }}
              className="rounded-lg"
            />
            <View className="flex-1 gap-2">
              <Animated.View
                style={{ backgroundColor: skeletonColor, opacity, height: 16 }}
                className="w-1/2 rounded"
              />
              <Animated.View
                style={{ backgroundColor: skeletonColor, opacity, height: 12 }}
                className="w-1/3 rounded"
              />
            </View>
          </View>
        ))}
      </View>
    );
  }

  return (
    <View className="w-full p-6 justify-center items-center gap-4">
      <Animated.View
        style={{ backgroundColor: skeletonColor, opacity, height: 40, width: 40 }}
        className="rounded-full"
      />
      <Animated.View
        style={{ backgroundColor: skeletonColor, opacity, height: 16 }}
        className="w-48 rounded"
      />
    </View>
  );
}
