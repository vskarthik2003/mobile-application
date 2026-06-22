import React, { useEffect, useRef, useState } from "react";
import { Animated, Text, View } from "react-native";
import { useTheme } from "../providers/ThemeProvider";

export default function ScrollableTextSection() {
  const translateX = useRef(new Animated.Value(0)).current;
  const [contentWidth, setContentWidth] = useState(0);
  const { theme } = useTheme();

  const items = ["End of season sale", "Open of the sale", "Shop the sale"];

  useEffect(() => {
    if (!contentWidth) return;

    Animated.loop(
      Animated.timing(translateX, {
        toValue: -contentWidth,
        duration: theme.scrollableTextSec.duration * 1000,
        useNativeDriver: true,
      }),
    ).start();
  }, [contentWidth]);

  return (
    <View
      style={{
        overflow: "hidden",
        paddingVertical: 20,
        backgroundColor: theme.scrollableTextSec.bgColor,
      }}
    >
      <Animated.View
        style={{
          flexDirection: "row",
          transform: [{ translateX }],
        }}
      >
        {/* First copy */}
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
                color: theme.scrollableTextSec.textColor,
              }}
            >
              {item}
            </Text>
          ))}
        </View>

        {/* Duplicate copy */}
        <View style={{ flexDirection: "row" }}>
          {items.map((item, index) => (
            <Text
              key={`dup-${index}`}
              style={{
                marginRight: 100,
                color: theme.scrollableTextSec.textColor,
              }}
            >
              {item}
            </Text>
          ))}
        </View>
      </Animated.View>
    </View>
  );
}
