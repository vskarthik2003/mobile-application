import { useTheme } from "@/src/providers/ThemeProvider";
import React from "react";
import { Text, View } from "react-native";

export default function AnnouncementBar() {
  const { theme } = useTheme();
  // console.log(theme);
  return (
    <View
      className="flex justify-center items-center py-3"
      style={{ backgroundColor: theme.announcementBar.bgColor }}
    >
      <Text>Hello</Text>
    </View>
  );
}
