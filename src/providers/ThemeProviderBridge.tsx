import { useAppConfig } from "@/src/providers/AppConfigProvider";
import { ThemeProvider } from "@/src/providers/ThemeProvider";
import type { PropsWithChildren } from "react";

export function ThemeProviderBridge({ children }: PropsWithChildren) {
  const { config } = useAppConfig();

  return <ThemeProvider config={config}>{children}</ThemeProvider>;
}
