import "@/global.css";
import { AppConfigProvider } from "@/src/providers/AppConfigProvider";
import { ThemeProviderBridge } from "@/src/providers/ThemeProviderBridge";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaView className="flex-1">
      <AppConfigProvider>
        <ThemeProviderBridge>
          <Stack screenOptions={{ headerShown: false }} />
        </ThemeProviderBridge>
      </AppConfigProvider>
    </SafeAreaView>
  );
}
