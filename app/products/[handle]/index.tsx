import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, router, Stack } from "expo-router";
import { useProduct } from "@/src/hooks/useProduct";
import { useRelatedProducts } from "@/src/hooks/useRelatedProducts";
import { useCart } from "@/src/providers/CartProvider";
import { useWishlist } from "@/src/providers/WishlistProvider";
import { useTheme } from "@/src/providers/ThemeProvider";
import { useAppConfig } from "@/src/providers/AppConfigProvider";
import { ProductContextProvider } from "@/src/providers/ProductContext";
import { DynamicPageRenderer } from "@/src/components/DynamicPageRenderer";

const { width } = Dimensions.get("window");

export default function ProductDetailScreen() {
  const { handle } = useLocalSearchParams<{ handle: string }>();
  const { product, loading, error, refetch } = useProduct(handle);
  const { products: related } = useRelatedProducts(handle, 6);
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { theme } = useTheme();
  const { config } = useAppConfig();

  // ─── Variant & Quantity state ─────────────────────────────────────────────
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    if (product?.options) {
      setSelectedOptions(
        Object.fromEntries(product.options.map((o) => [o.name, o.values[0] ?? ""]))
      );
    }
  }, [product]);

  const selectedVariant = useMemo(
    () =>
      product?.variants.find((v) =>
        v.selectedOptions.every((opt) => selectedOptions[opt.name] === opt.value)
      ) ?? product?.variants[0],
    [product, selectedOptions]
  );

  const price = parseFloat(selectedVariant?.price.amount ?? product?.priceRange.minVariantPrice.amount ?? "0");
  const compareAt = selectedVariant?.compareAtPrice ? parseFloat(selectedVariant.compareAtPrice.amount) : 0;
  const hasDiscount = compareAt > price;
  const discountPct = hasDiscount ? Math.round(((compareAt - price) / compareAt) * 100) : 0;
  const inWishlist = product ? isInWishlist(product.id) : false;

  const handleAddToCart = useCallback(async () => {
    if (!product || !selectedVariant) return;
    setAddingToCart(true);
    try {
      addToCart(product, selectedVariant, quantity);
      Alert.alert("Added to Cart", `${product.title} has been added to your cart.`, [
        { text: "View Cart", onPress: () => router.push("/(tabs)/cart") },
        { text: "Continue", style: "cancel" },
      ]);
    } finally {
      setAddingToCart(false);
    }
  }, [product, selectedVariant, quantity, addToCart]);

  // ─── JSON-driven page sections (PDP) ────────────────────────────────────

  const pdpSections = config.productPage;

  // ─── Loading / Error ──────────────────────────────────────────────────────

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: theme.colors.background }}>
        <ActivityIndicator color={theme.colors.primary} />
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 12, padding: 32, backgroundColor: theme.colors.background }}>
        <Text style={{ color: theme.colors.text, fontWeight: "700", fontSize: 16 }}>Product not found</Text>
        <TouchableOpacity onPress={refetch} style={{ backgroundColor: theme.colors.primary, paddingHorizontal: 24, paddingVertical: 10, borderRadius: 20 }}>
          <Text style={{ color: "#fff", fontWeight: "700" }}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  if (pdpSections && pdpSections.length > 0) {
    // Fully JSON-driven PDP via DynamicPageRenderer
    return (
      <>
        <Stack.Screen
          options={{
            headerShown: true,
            title: product.title,
            headerStyle: { backgroundColor: theme.colors.background },
            headerTintColor: theme.colors.text,
            headerShadowVisible: false,
            headerBackTitle: "",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => (inWishlist ? removeFromWishlist(product.id) : addToWishlist(product))}
                style={{ paddingHorizontal: 8 }}
              >
                <Ionicons
                  name={inWishlist ? "heart" : "heart-outline"}
                  size={22}
                  color={inWishlist ? theme.colors.primary : theme.colors.text}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <ProductContextProvider
          product={product}
          loading={loading}
          error={error}
          handle={handle}
        >
          <DynamicPageRenderer sections={pdpSections} />
        </ProductContextProvider>
      </>
    );
  }

  // ─── Default PDP Layout (fallback) ────────────────────────────────────────

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "",
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerShadowVisible: false,
          headerBackTitle: "",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => (inWishlist ? removeFromWishlist(product.id) : addToWishlist(product))}
              style={{ paddingHorizontal: 8 }}
            >
              <Ionicons
                name={inWishlist ? "heart" : "heart-outline"}
                size={22}
                color={inWishlist ? theme.colors.primary : theme.colors.text}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView
        style={{ flex: 1, backgroundColor: theme.colors.background }}
        showsVerticalScrollIndicator={false}
      >
        {/* Image Gallery */}
        <View style={{ position: "relative" }}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(e) => {
              const w = e.nativeEvent.layoutMeasurement.width;
              if (w > 0) setActiveImg(Math.round(e.nativeEvent.contentOffset.x / w));
            }}
            scrollEventThrottle={16}
            style={{ width, height: width * 1.15 }}
          >
            {product.images.map((img, i) => (
              <Image
                key={i}
                source={{ uri: img.url }}
                style={{ width, height: width * 1.15 }}
                contentFit="cover"
              />
            ))}
          </ScrollView>
          {/* Dots */}
          {product.images.length > 1 && (
            <View style={{ position: "absolute", bottom: 12, left: 0, right: 0, flexDirection: "row", justifyContent: "center", gap: 6 }}>
              {product.images.map((_, i) => (
                <View key={i} style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: i === activeImg ? theme.colors.primary : "rgba(255,255,255,0.6)" }} />
              ))}
            </View>
          )}
          {discountPct > 0 && (
            <View style={{ position: "absolute", top: 12, left: 12, backgroundColor: theme.colors.primary, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 }}>
              <Text style={{ color: "#fff", fontWeight: "700", fontSize: 12 }}>-{discountPct}%</Text>
            </View>
          )}
        </View>

        <View style={{ padding: 16, gap: 16 }}>
          {/* Title & Price */}
          <View style={{ gap: 6 }}>
            {product.vendor && (
              <Text style={{ color: theme.colors.textMuted, fontSize: 11, fontWeight: "600", textTransform: "uppercase", letterSpacing: 1 }}>
                {product.vendor}
              </Text>
            )}
            <Text style={{ color: theme.colors.text, fontSize: 22, fontWeight: "800", lineHeight: 28 }}>
              {product.title}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Text style={{ color: theme.colors.text, fontSize: 20, fontWeight: "800" }}>
                ₹{price.toLocaleString("en-IN")}
              </Text>
              {hasDiscount && (
                <Text style={{ color: theme.colors.textMuted, fontSize: 15, textDecorationLine: "line-through" }}>
                  ₹{compareAt.toLocaleString("en-IN")}
                </Text>
              )}
            </View>
          </View>

          {/* Variant Selectors */}
          {product.options.map((opt) => (
            <View key={opt.name} style={{ gap: 8 }}>
              <Text style={{ color: theme.colors.text, fontSize: 13, fontWeight: "700" }}>
                {opt.name}:{" "}
                <Text style={{ fontWeight: "400", color: theme.colors.textMuted }}>{selectedOptions[opt.name]}</Text>
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {opt.values.map((val) => {
                  const sel = selectedOptions[opt.name] === val;
                  return (
                    <TouchableOpacity
                      key={val}
                      onPress={() => setSelectedOptions((prev) => ({ ...prev, [opt.name]: val }))}
                      style={{
                        paddingHorizontal: 14,
                        paddingVertical: 8,
                        borderRadius: theme.radius.md,
                        borderWidth: 1.5,
                        borderColor: sel ? theme.colors.primary : theme.colors.border,
                        backgroundColor: sel ? theme.colors.primary + "12" : "transparent",
                      }}
                      activeOpacity={0.7}
                    >
                      <Text style={{ color: sel ? theme.colors.primary : theme.colors.text, fontSize: 13, fontWeight: sel ? "700" : "400" }}>
                        {val}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}

          {/* Quantity Selector */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <Text style={{ color: theme.colors.text, fontSize: 13, fontWeight: "700" }}>Quantity</Text>
            <View style={{ flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.radius.md, overflow: "hidden" }}>
              <TouchableOpacity
                onPress={() => setQuantity((q) => Math.max(1, q - 1))}
                style={{ width: 40, height: 40, alignItems: "center", justifyContent: "center", backgroundColor: theme.colors.surface }}
                activeOpacity={0.7}
              >
                <Ionicons name="remove" size={18} color={theme.colors.text} />
              </TouchableOpacity>
              <Text style={{ width: 44, textAlign: "center", fontSize: 14, fontWeight: "700", color: theme.colors.text }}>
                {quantity}
              </Text>
              <TouchableOpacity
                onPress={() => setQuantity((q) => q + 1)}
                style={{ width: 40, height: 40, alignItems: "center", justifyContent: "center", backgroundColor: theme.colors.surface }}
                activeOpacity={0.7}
              >
                <Ionicons name="add" size={18} color={theme.colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          {/* CTA Buttons */}
          <View style={{ gap: 10 }}>
            <TouchableOpacity
              onPress={handleAddToCart}
              disabled={!selectedVariant?.availableForSale || addingToCart}
              style={{
                backgroundColor: selectedVariant?.availableForSale ? theme.colors.primary : theme.colors.border,
                paddingVertical: 16,
                borderRadius: theme.radius.lg,
                alignItems: "center",
              }}
              activeOpacity={0.85}
            >
              <Text style={{ color: "#fff", fontWeight: "700", fontSize: 15 }}>
                {addingToCart ? "Adding…" : !selectedVariant?.availableForSale ? "Out of Stock" : "Add to Cart"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderWidth: 1.5,
                borderColor: theme.colors.primary,
                paddingVertical: 16,
                borderRadius: theme.radius.lg,
                alignItems: "center",
              }}
              activeOpacity={0.85}
            >
              <Text style={{ color: theme.colors.primary, fontWeight: "700", fontSize: 15 }}>Buy Now</Text>
            </TouchableOpacity>
          </View>

          {/* Description */}
          {product.description && (
            <View style={{ borderTopWidth: 1, borderColor: theme.colors.border, paddingTop: 16, gap: 8 }}>
              <Text style={{ color: theme.colors.text, fontSize: 14, fontWeight: "700" }}>Product Description</Text>
              <Text style={{ color: theme.colors.textMuted, fontSize: 13, lineHeight: 20 }}>
                {product.description}
              </Text>
            </View>
          )}

          {/* Related Products */}
          {related.length > 0 && (
            <View style={{ borderTopWidth: 1, borderColor: theme.colors.border, paddingTop: 16, gap: 12 }}>
              <Text style={{ color: theme.colors.text, fontSize: 15, fontWeight: "700" }}>You May Also Like</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
                {related.map((rp) => {
                  const rPrice = parseFloat(rp.priceRange.minVariantPrice.amount);
                  return (
                    <TouchableOpacity
                      key={rp.id}
                      onPress={() => router.push(`/products/${rp.handle}`)}
                      style={{
                        width: 140,
                        backgroundColor: theme.colors.surface,
                        borderRadius: theme.radius.lg,
                        overflow: "hidden",
                        borderWidth: 1,
                        borderColor: theme.colors.border,
                      }}
                      activeOpacity={0.9}
                    >
                      <View style={{ width: 140, height: 160, backgroundColor: "#f0f0f0" }}>
                        {rp.images[0] && (
                          <Image source={{ uri: rp.images[0].url }} style={{ width: "100%", height: "100%" }} contentFit="cover" />
                        )}
                      </View>
                      <View style={{ padding: 8, gap: 3 }}>
                        <Text style={{ color: theme.colors.text, fontSize: 12, fontWeight: "600" }} numberOfLines={2}>{rp.title}</Text>
                        <Text style={{ color: theme.colors.primary, fontSize: 12, fontWeight: "700" }}>₹{rPrice.toLocaleString("en-IN")}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          )}

          <View style={{ height: 24 }} />
        </View>
      </ScrollView>
    </>
  );
}
