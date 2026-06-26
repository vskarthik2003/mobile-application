// app/product/[id].tsx
import ProductGallery from "@/src/components/Products/ProductGallery";
import ProductHeader from "@/src/components/Products/ProductHeader";
import ProductDetailsJson from "@/src/config/mock-products";
import { useTheme } from "@/src/providers/ThemeProvider";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const MOCK_PRODUCTS = ProductDetailsJson.data.products.edges.find(
    (products: any) => products?.node?.id?.includes(id),
  )?.node;
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <View
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      className="p-4"
    >
      <TouchableOpacity onPress={() => router.back()} className="mb-4">
        <Text style={{ color: theme.colors.primary }}>← Go Back</Text>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ProductGallery product={MOCK_PRODUCTS} />
        <ProductHeader product={MOCK_PRODUCTS} />
      </ScrollView>
    </View>
  );
}
