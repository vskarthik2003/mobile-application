import { AnnouncementBar } from "@/src/components/AnnouncementBar";
import { DynamicTabBar } from "@/src/components/DynamicTabBar";
import { SectionRenderer } from "@/src/components/SectionRenderer";
import { useAppConfig } from "@/src/providers/AppConfigProvider";
import { useTheme } from "@/src/providers/ThemeProvider";
import React from "react";
import { ScrollView, View } from "react-native";

export default function Home() {
  const { config, activePageId } = useAppConfig();
  const { theme } = useTheme();

  // Find the currently active page configuration
  const page = config.pages.find((p) => p.id === activePageId) || config.pages[0];

  if (!page) {
    return null;
  }

  return (
    <View className="flex-1" style={{ backgroundColor: theme.colors.background }}>
      {/* Render the AnnouncementBar dynamically from theme settings */}
      {theme.announcementBar && (
        <AnnouncementBar
          messages={theme.announcementBar.messages}
          bgColor={theme.announcementBar.bgColor}
          textColor={theme.announcementBar.textColor}
          autoPlay={theme.announcementBar.autoPlay}
          timeGap={theme.announcementBar.timeGap}
        />
      )}

      {/* Render the page sections dynamically */}
      <ScrollView
        className="flex-grow"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {page.sections.map((section) => (
          <SectionRenderer key={section.id} section={section} />
        ))}
      </ScrollView>
      <DynamicTabBar />
    </View>
  );
}
