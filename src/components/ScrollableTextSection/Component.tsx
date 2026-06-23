import { useTheme } from "@/src/providers/ThemeProvider";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Text, View } from "react-native";
import { ScrollableTextSectionProps } from "./types";

export function ScrollableTextSection({
  direction,
  duration,
  bgColor,
  textColor,
}: ScrollableTextSectionProps) {
  const translateX = useRef(new Animated.Value(0)).current;
  const [contentWidth, setContentWidth] = useState(0);
  const { theme } = useTheme();

  const items = ["End of season sale", "Open of the sale", "Shop the sale"];

  useEffect(() => {
    if (!contentWidth) return;

    const startValue = direction === "rtl" ? 0 : -contentWidth;
    const endValue = direction === "rtl" ? -contentWidth : 0;

    translateX.setValue(startValue);

    const loop = Animated.loop(
      Animated.timing(translateX, {
        toValue: endValue,
        duration: duration * 1000,
        useNativeDriver: true,
      }),
    );

    loop.start();

    return () => loop.stop();
  }, [contentWidth, direction]);

  return (
    <View
      style={{
        overflow: "hidden",
        paddingVertical: 20,
        backgroundColor: bgColor,
      }}
    >
      <Animated.View
        style={{
          flexDirection: "row",
          transform: [{ translateX }],
        }}
      >
        {/* For LTR we need duplicate BEFORE */}
        {direction === "ltr" && (
          <View style={{ flexDirection: "row" }}>
            {items.map((item, index) => (
              <Text
                key={`before-${index}`}
                style={{
                  marginRight: 100,
                  color: textColor,
                }}
              >
                {item}
              </Text>
            ))}
          </View>
        )}

        {/* Main Content */}
        <View
          onLayout={(e) => {
            setContentWidth(e.nativeEvent.layout.width);
          }}
          style={{ flexDirection: "row" }}
        >
          {items.map((item, index) => (
            <Text
              key={index}
              style={{
                marginRight: 100,
                color: textColor,
              }}
            >
              {item}
            </Text>
          ))}
        </View>

        {/* For RTL we need duplicate AFTER */}
        {direction === "rtl" && (
          <View style={{ flexDirection: "row" }}>
            {items.map((item, index) => (
              <Text
                key={`after-${index}`}
                style={{
                  marginRight: 100,
                  color: textColor,
                }}
              >
                {item}
              </Text>
            ))}
          </View>
        )}
      </Animated.View>
    </View>
  );
}
