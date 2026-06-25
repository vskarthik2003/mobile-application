import React, { useCallback, useState, useMemo, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Modal,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, router, Stack } from "expo-router";
import { useCollection } from "@/src/hooks/useCollection";
import { useTheme } from "@/src/providers/ThemeProvider";
import { useCart } from "@/src/providers/CartProvider";
import { useWishlist } from "@/src/providers/WishlistProvider";
import { useAppConfig } from "@/src/providers/AppConfigProvider";
import { CollectionContextProvider } from "@/src/providers/CollectionContext";
import { DynamicPageRenderer } from "@/src/components/DynamicPageRenderer";
import type { ShopifyProduct } from "@/src/services/shopify";
import type { SortKey } from "@/src/services/shopify";

const { width } = Dimensions.get("window");
const CARD = (width - 48) / 2;

const SORT_OPTIONS: { label: string; value: SortKey }[] = [
  { label: "Featured",            value: "RELEVANCE"    },
  { label: "Newest",              value: "CREATED_AT"   },
  { label: "Price: Low to High",  value: "PRICE"        },
  { label: "Price: High to Low",  value: "PRICE_DESC"   },
  { label: "Best Selling",        value: "BEST_SELLING" },
];

// ─── Product Card ────────────────────────────────────────────────────────────

function ProductCard({ product }: { product: ShopifyProduct }) {
  const { theme } = useTheme();
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const inWish = isInWishlist(product.id);

  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const compare = product.compareAtPriceRange
    ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount)
    : 0;
  const discount = compare > price ? Math.round(((compare - price) / compare) * 100) : 0;

  return (
    <TouchableOpacity
      style={{
        width: CARD,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radius.lg,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: theme.colors.border,
        marginBottom: 12,
      }}
      onPress={() => router.push(`/products/${product.handle}`)}
      activeOpacity={0.9}
    >
      {/* Image */}
      <View style={{ width: "100%", height: CARD * 1.25, backgroundColor: "#f0f0f0" }}>
        {product.images[0] ? (
          <Image
            source={{ uri: product.images[0].url }}
            style={{ width: "100%", height: "100%" }}
            contentFit="cover"
          />
        ) : (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Ionicons name="image-outline" size={32} color={theme.colors.textMuted} />
          </View>
        )}

        {discount > 0 && (
          <View
            style={{
              position: "absolute",
              top: 8,
              left: 8,
              backgroundColor: theme.colors.primary,
              borderRadius: 6,
              paddingHorizontal: 6,
              paddingVertical: 2,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 10, fontWeight: "700" }}>-{discount}%</Text>
          </View>
        )}

        <TouchableOpacity
          onPress={() => (inWish ? removeFromWishlist(product.id) : addToWishlist(product))}
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "rgba(255,255,255,0.9)",
            borderRadius: 20,
            padding: 6,
          }}
          activeOpacity={0.8}
        >
          <Ionicons
            name={inWish ? "heart" : "heart-outline"}
            size={16}
            color={inWish ? theme.colors.primary : theme.colors.textMuted}
          />
        </TouchableOpacity>
      </View>

      <View style={{ padding: 10, gap: 4 }}>
        <Text style={{ color: theme.colors.text, fontSize: 13, fontWeight: "600" }} numberOfLines={2}>
          {product.title}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <Text style={{ color: theme.colors.primary, fontSize: 13, fontWeight: "700" }}>
            ₹{price.toLocaleString("en-IN")}
          </Text>
          {compare > price && (
            <Text style={{ color: theme.colors.textMuted, fontSize: 11, textDecorationLine: "line-through" }}>
              ₹{compare.toLocaleString("en-IN")}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ─── Collection Screen ───────────────────────────────────────────────────────

export default function CollectionScreen() {
  const { handle } = useLocalSearchParams<{ handle: string }>();
  const { collection, products, loading, error, refetch } = useCollection(handle);
  const { theme } = useTheme();
  const { config } = useAppConfig();

  const [sortKey, setSortKey] = useState<SortKey>("RELEVANCE");
  const [showSort, setShowSort] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Custom page config for this collection handle (or "default" fallback)
  const customSections = useMemo(
    () =>
      config.collectionPages?.[handle] ??
      config.collectionPages?.["default"] ??
      [],
    [config.collectionPages, handle]
  );

  const sortedProducts = useMemo(() => {
    const ps = [...products];
    if (sortKey === "PRICE") ps.sort((a, b) => parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount));
    if (sortKey === "PRICE_DESC") ps.sort((a, b) => parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount));
    if (sortKey === "CREATED_AT") ps.reverse();
    return ps;
  }, [products, sortKey]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  // ─── Header (hero + sort bar) ─────────────────────────────────────────────

  const ListHeader = useMemo(() => (
    <View>
      {/* Custom sections (hero, promo, etc.) */}
      {customSections.length > 0 && (
        <CollectionContextProvider
          collection={collection}
          products={products}
          loading={loading}
          error={error}
          handle={handle}
        >
          <DynamicPageRenderer sections={customSections} scrollable={false} />
        </CollectionContextProvider>
      )}

      {/* Collection hero fallback */}
      {customSections.length === 0 && collection?.image && (
        <View style={{ height: 200, backgroundColor: "#f0f0f0" }}>
          <Image source={{ uri: collection.image.url }} style={{ width: "100%", height: "100%" }} contentFit="cover" />
          <View style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.35)", justifyContent: "flex-end", padding: 16 }}>
            <Text style={{ color: "#fff", fontSize: 22, fontWeight: "800" }}>{collection?.title}</Text>
            {collection?.description && (
              <Text style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, marginTop: 4 }} numberOfLines={2}>
                {collection.description}
              </Text>
            )}
          </View>
        </View>
      )}

      {/* Sort bar */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderColor: theme.colors.border,
        }}
      >
        <Text style={{ color: theme.colors.textMuted, fontSize: 12, fontWeight: "500" }}>
          {sortedProducts.length} products
        </Text>
        <TouchableOpacity
          onPress={() => setShowSort(true)}
          style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
          activeOpacity={0.7}
        >
          <Ionicons name="funnel-outline" size={16} color={theme.colors.text} />
          <Text style={{ color: theme.colors.text, fontSize: 13, fontWeight: "600" }}>
            {SORT_OPTIONS.find((s) => s.value === sortKey)?.label ?? "Sort"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  ), [customSections, collection, products, loading, error, handle, sortedProducts.length, sortKey, theme]);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: collection?.title ?? handle,
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerShadowVisible: false,
          headerBackTitle: "",
        }}
      />

      {loading && products.length === 0 ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator color={theme.colors.primary} />
        </View>
      ) : error ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 32, gap: 12 }}>
          <Text style={{ color: theme.colors.text, fontWeight: "700", fontSize: 16 }}>Failed to load</Text>
          <TouchableOpacity onPress={refetch} style={{ backgroundColor: theme.colors.primary, paddingHorizontal: 24, paddingVertical: 10, borderRadius: 20 }}>
            <Text style={{ color: "#fff", fontWeight: "700" }}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={sortedProducts}
          keyExtractor={(p) => p.id}
          numColumns={2}
          contentContainerStyle={{ paddingHorizontal: 12 }}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          ListHeaderComponent={ListHeader}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={theme.colors.primary} />
          }
          renderItem={({ item }) => <ProductCard product={item} />}
          ListEmptyComponent={
            <View style={{ alignItems: "center", paddingTop: 48, gap: 8 }}>
              <Text style={{ color: theme.colors.textMuted, fontSize: 15 }}>No products found.</Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: theme.colors.background }}
        />
      )}

      {/* Sort Modal */}
      <Modal visible={showSort} animationType="slide" transparent onRequestClose={() => setShowSort(false)}>
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)" }}
          activeOpacity={1}
          onPress={() => setShowSort(false)}
        />
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: theme.colors.background,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingBottom: 40,
          }}
        >
          <View style={{ alignItems: "center", padding: 12 }}>
            <View style={{ width: 40, height: 4, backgroundColor: theme.colors.border, borderRadius: 2 }} />
          </View>
          <Text style={{ paddingHorizontal: 20, paddingBottom: 12, fontWeight: "700", fontSize: 16, color: theme.colors.text }}>
            Sort By
          </Text>
          {SORT_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt.value}
              onPress={() => { setSortKey(opt.value); setShowSort(false); }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                paddingVertical: 14,
                borderBottomWidth: 1,
                borderColor: theme.colors.border,
              }}
              activeOpacity={0.7}
            >
              <Text style={{ color: theme.colors.text, fontSize: 14, fontWeight: sortKey === opt.value ? "700" : "400" }}>
                {opt.label}
              </Text>
              {sortKey === opt.value && <Ionicons name="checkmark" size={18} color={theme.colors.primary} />}
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </>
  );
}
