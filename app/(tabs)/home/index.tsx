import React, { useCallback, useState } from "react";
import { useAppConfig } from "@/src/providers/AppConfigProvider";
import { useTheme } from "@/src/providers/ThemeProvider";
import { AnnouncementBar } from "@/src/components/AnnouncementBar";
import { DynamicPageRenderer } from "@/src/components/DynamicPageRenderer";

export default function HomeScreen() {
  const { config, reloadConfig } = useAppConfig();
  const { theme } = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  const page = config.pages.find((p) => p.id === "home") ?? config.pages[0];

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await reloadConfig();
    setRefreshing(false);
  }, [reloadConfig]);

  return (
    <DynamicPageRenderer
      sections={page?.sections ?? []}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      header={
        theme.announcementBar ? (
          <AnnouncementBar
            messages={theme.announcementBar.messages}
            bgColor={theme.announcementBar.bgColor}
            textColor={theme.announcementBar.textColor}
            autoPlay={theme.announcementBar.autoPlay}
            timeGap={theme.announcementBar.timeGap}
          />
        ) : undefined
      }
    />
  );
}
