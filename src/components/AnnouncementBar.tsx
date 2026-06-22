import { useTheme } from "@/src/providers/ThemeProvider";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function AnnouncementBar() {
  const { theme } = useTheme();

  const announcements = theme.announcementBar.messages;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, theme.announcementBar.timeGap * 1000);

    return () => clearInterval(interval);
  }, [theme.announcementBar.timeGap]);

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  const goPrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + announcements.length) % announcements.length,
    );
  };

  return (
    <View
      className="flex-row items-center justify-between px-4 py-3"
      style={{
        backgroundColor: theme.announcementBar.bgColor,
      }}
    >
      <TouchableOpacity onPress={goPrev}>
        <Text
          // className="text-lg"
          style={{
            color: theme.announcementBar.textColor,
          }}
        >
          <Ionicons name="arrow-back" />
        </Text>
      </TouchableOpacity>

      <Text
        className="flex-1 text-center"
        style={{
          color: theme.announcementBar.textColor,
        }}
      >
        {announcements[currentIndex]}
      </Text>

      <TouchableOpacity onPress={goNext}>
        <Text
          style={{
            color: theme.announcementBar.textColor,
            fontSize: 18,
          }}
        >
          <Ionicons name="arrow-forward" />
        </Text>
      </TouchableOpacity>
    </View>
  );
}
