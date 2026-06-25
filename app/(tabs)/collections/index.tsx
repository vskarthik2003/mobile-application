import React, { useCallback, useState } from "react";
import { useAppConfig } from "@/src/providers/AppConfigProvider";
import { DynamicPageRenderer } from "@/src/components/DynamicPageRenderer";

export default function CollectionsScreen() {
  const { config, reloadConfig } = useAppConfig();
  const [refreshing, setRefreshing] = useState(false);

  const page = config.pages.find((p) => p.id === "collections");

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
      emptyMessage="No collections have been configured."
    />
  );
}
