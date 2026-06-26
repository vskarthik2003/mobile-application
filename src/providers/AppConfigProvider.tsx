import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { ActivityIndicator, Text, View } from "react-native";

import type { AppConfig } from "@/src/schema/app-config";
import { loadAppConfig } from "@/src/services/config-loader";

type AppConfigContextValue = {
  config: AppConfig;
  activePageId: string;
  setActivePageId: (pageId: string) => void;
  reloadConfig: () => Promise<void>;
  isLoading: boolean;
};

const AppConfigContext = createContext<AppConfigContextValue | null>(null);

export function AppConfigProvider({ children }: PropsWithChildren) {
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [activePageId, setActivePageId] = useState("home");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reloadConfig = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const nextConfig = await loadAppConfig();
      setConfig(nextConfig);
      setActivePageId((current) => {
        const pageExists = nextConfig.pages.some((page) => page.id === current);
        return pageExists ? current : (nextConfig.navigation[0]?.id ?? "home");
      });
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Failed to load config",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    reloadConfig();
  }, [reloadConfig]);

  const value = useMemo(() => {
    if (!config) {
      return null;
    }

    return {
      config,
      activePageId,
      setActivePageId,
      reloadConfig,
      isLoading,
    };
  }, [config, activePageId, reloadConfig, isLoading]);

  if (isLoading && !config) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#E11D48" />
        <Text className="mt-3 text-gray-500">Loading preview...</Text>
      </View>
    );
  }

  if (error || !value) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-6">
        <Text className="text-lg font-semibold text-gray-900 mb-2">
          Preview unavailable
        </Text>
        <Text className="text-center text-gray-500">{error}</Text>
      </View>
    );
  }

  return (
    <AppConfigContext.Provider value={value}>
      {children}
    </AppConfigContext.Provider>
  );
}

export function useAppConfig() {
  const context = useContext(AppConfigContext);

  if (!context) {
    throw new Error("useAppConfig must be used within AppConfigProvider");
  }

  return context;
}
