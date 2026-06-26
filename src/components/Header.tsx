import { useCart } from "@/src/providers/CartProvider";
import { useTheme } from "@/src/providers/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

type HeaderProps = {
  showSearch?: boolean;
  showCart?: boolean;
  showMenu?: boolean;
  sectionId?: string;
  layout?: "default" | "center-logo";
};
export function Header({
  showSearch = true,
  showCart = true,
  showMenu = true,
  layout = "default",
}: HeaderProps) {
  const { theme, branding } = useTheme();
  const { cart, totalItems } = useCart();

  if (layout === "center-logo") {
    return (
      <View
        className="flex-row items-center justify-between px-5 py-4"
        style={{ backgroundColor: theme.colors.background }}
      >
        {/* Left */}
        <View className="w-10">
          {showMenu && (
            <TouchableOpacity>
              <Ionicons name="menu" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          )}
        </View>

        {/* Center Logo */}
        <Text
          className="text-xl font-bold"
          style={{ color: theme.colors.primary }}
        >
          {branding.appName}
        </Text>

        {/* Right */}
        <View className="flex-row items-center gap-4 w-16 justify-end">
          {showSearch && (
            <TouchableOpacity>
              <Ionicons name="search" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          )}

          {showCart && (
            <TouchableOpacity onPress={() => router.push("/cart")}>
              <Ionicons
                name="cart-outline"
                size={24}
                color={theme.colors.text}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  return (
    <View
      className="flex-row items-center justify-between px-5 py-4"
      style={{ backgroundColor: theme.colors.background }}
    >
      <Text
        className="text-xl font-bold"
        style={{ color: theme.colors.primary }}
      >
        {branding.appName}
      </Text>

      <View className="flex-row items-center gap-4">
        {showSearch && (
          <TouchableOpacity>
            <Ionicons name="search" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        )}

        {showMenu && (
          <TouchableOpacity>
            <Ionicons name="menu" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        )}

        {/* {showCart && (
          <TouchableOpacity onPress={() => router.push("/cart")}>
            <Ionicons name="cart-outline" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        )} */}
        {showCart && (
          <TouchableOpacity
            onPress={() => router.push("/cart")}
            style={{ position: "relative" }}
          >
            <Ionicons name="cart-outline" size={24} color={theme.colors.text} />

            {totalItems > 0 && (
              <View
                style={{
                  position: "absolute",
                  top: -6,
                  right: -8,
                  minWidth: 18,
                  height: 18,
                  borderRadius: 9,
                  backgroundColor: "#EF4444",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingHorizontal: 4,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 10,
                    fontWeight: "700",
                  }}
                >
                  {totalItems > 99 ? "99+" : totalItems}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
