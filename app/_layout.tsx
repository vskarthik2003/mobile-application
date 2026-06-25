import "@/global.css";
import { AppConfigProvider } from "@/src/providers/AppConfigProvider";
import { ThemeProviderBridge } from "@/src/providers/ThemeProviderBridge";
import { ShopifyProvider } from "@/src/providers/ShopifyProvider";
import { AuthProvider } from "@/src/providers/AuthProvider";
import { CartProvider } from "@/src/providers/CartProvider";
import { WishlistProvider } from "@/src/providers/WishlistProvider";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ShopifyProvider>
        <AppConfigProvider>
          <ThemeProviderBridge>
            <AuthProvider>
              <CartProvider>
                <WishlistProvider>
                  <Stack screenOptions={{ headerShown: false }} />
                </WishlistProvider>
              </CartProvider>
            </AuthProvider>
          </ThemeProviderBridge>
        </AppConfigProvider>
      </ShopifyProvider>
    </GestureHandlerRootView>
  );
}
