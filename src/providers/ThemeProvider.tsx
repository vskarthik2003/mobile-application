import {
  createContext,
  useContext,
  useMemo,
  type PropsWithChildren,
} from "react";

import type { AppConfig, Branding, Theme } from "@/src/schema/app-config";

type ThemeContextValue = {
  theme: Theme;
  branding: Branding;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

type ThemeProviderProps = PropsWithChildren<{
  config: AppConfig;
}>;

export function ThemeProvider({ config, children }: ThemeProviderProps) {
  const value = useMemo(
    () => ({
      theme: config.theme,
      branding: config.branding,
    }),
    [config.theme, config.branding],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
