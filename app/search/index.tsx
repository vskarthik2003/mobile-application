import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Keyboard,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { useSearchProducts } from "@/src/hooks/useSearchProducts";
import { useTheme } from "@/src/providers/ThemeProvider";

const { width } = Dimensions.get("window");
const CARD = (width - 48) / 2;

const TRENDING = ["Silk Dress", "Chelsea Boots", "Linen Shirt", "Gold Hoops", "Sunglasses"];
const RECENT_KEY = "recent_searches";

export default function SearchScreen() {
  const { theme } = useTheme();
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<string[]>([]);
  const { products, loading } = useSearchProducts(query);

  const handleSelect = useCallback((q: string) => {
    setQuery(q);
    setRecent((prev) => [q, ...prev.filter((r) => r !== q)].slice(0, 8));
    Keyboard.dismiss();
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Search",
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerShadowVisible: false,
          headerBackTitle: "",
        }}
      />

      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        {/* Search Bar */}
        <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: theme.colors.surface,
              borderRadius: theme.radius.lg,
              borderWidth: 1,
              borderColor: theme.colors.border,
              paddingHorizontal: 12,
              gap: 8,
            }}
          >
            <Ionicons name="search-outline" size={18} color={theme.colors.textMuted} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search for products…"
              placeholderTextColor={theme.colors.textMuted}
              returnKeyType="search"
              onSubmitEditing={() => handleSelect(query)}
              style={{ flex: 1, height: 44, fontSize: 15, color: theme.colors.text }}
              autoFocus
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={() => setQuery("")} activeOpacity={0.7}>
                <Ionicons name="close-circle" size={18} color={theme.colors.textMuted} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {loading && query.length > 0 ? (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <ActivityIndicator color={theme.colors.primary} />
          </View>
        ) : query.length === 0 ? (
          /* Discovery State */
          <View style={{ paddingHorizontal: 16, gap: 20 }}>
            {recent.length > 0 && (
              <View style={{ gap: 10 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <Text style={{ color: theme.colors.text, fontWeight: "700", fontSize: 14 }}>Recent Searches</Text>
                  <TouchableOpacity onPress={() => setRecent([])} activeOpacity={0.7}>
                    <Text style={{ color: theme.colors.primary, fontSize: 12, fontWeight: "600" }}>Clear</Text>
                  </TouchableOpacity>
                </View>
                {recent.map((r) => (
                  <TouchableOpacity
                    key={r}
                    onPress={() => handleSelect(r)}
                    style={{ flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 6 }}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="time-outline" size={16} color={theme.colors.textMuted} />
                    <Text style={{ color: theme.colors.text, fontSize: 14 }}>{r}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <View style={{ gap: 10 }}>
              <Text style={{ color: theme.colors.text, fontWeight: "700", fontSize: 14 }}>Trending</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {TRENDING.map((t) => (
                  <TouchableOpacity
                    key={t}
                    onPress={() => handleSelect(t)}
                    style={{
                      paddingHorizontal: 14,
                      paddingVertical: 8,
                      borderRadius: 20,
                      backgroundColor: theme.colors.surface,
                      borderWidth: 1,
                      borderColor: theme.colors.border,
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={{ color: theme.colors.text, fontSize: 13 }}>{t}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        ) : products.length === 0 ? (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 8, padding: 32 }}>
            <Text style={{ fontSize: 36 }}>🔍</Text>
            <Text style={{ color: theme.colors.text, fontWeight: "700", fontSize: 16 }}>No results for "{query}"</Text>
            <Text style={{ color: theme.colors.textMuted, fontSize: 13, textAlign: "center" }}>
              Try different keywords or explore our collections.
            </Text>
          </View>
        ) : (
          <FlatList
            data={products}
            keyExtractor={(p) => p.id}
            numColumns={2}
            contentContainerStyle={{ paddingHorizontal: 12, paddingTop: 4 }}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => {
              const price = parseFloat(item.priceRange.minVariantPrice.amount);
              return (
                <TouchableOpacity
                  onPress={() => { router.push(`/products/${item.handle}`); }}
                  style={{
                    width: CARD,
                    backgroundColor: theme.colors.surface,
                    borderRadius: theme.radius.lg,
                    overflow: "hidden",
                    borderWidth: 1,
                    borderColor: theme.colors.border,
                    marginBottom: 12,
                  }}
                  activeOpacity={0.9}
                >
                  <View style={{ width: "100%", height: CARD * 1.2, backgroundColor: "#f0f0f0" }}>
                    {item.images[0] && (
                      <Image source={{ uri: item.images[0].url }} style={{ width: "100%", height: "100%" }} contentFit="cover" />
                    )}
                  </View>
                  <View style={{ padding: 10, gap: 3 }}>
                    <Text style={{ color: theme.colors.text, fontSize: 13, fontWeight: "600" }} numberOfLines={2}>{item.title}</Text>
                    <Text style={{ color: theme.colors.primary, fontSize: 13, fontWeight: "700" }}>
                      ₹{price.toLocaleString("en-IN")}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
    </>
  );
}
