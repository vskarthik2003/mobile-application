// src/components/product/ProductInfo.tsx

import { useCart } from "@/src/providers/CartProvider";
import { useTheme } from "@/src/providers/ThemeProvider";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

interface Props {
  product: any;
}

export default function ProductHeader({ product }: Props) {
  const { theme } = useTheme();
  const { addToCart, cart } = useCart();

  const variants = product.variants.edges;
  const data = variants.map((variant: any) => ({
    label: `$${variant.node.price.amount}`,
    value: variant.node.id,
  }));
  const [selectedVariant, setSelectedVariant] = useState(variants[0]?.node.id);

  const [qty, setQty] = useState(1);

  const addProductToCart = (product: any) => {
    console.log(product);
    addToCart({
      id: product.id.split("/").pop(),
      image: product.featuredImage.url,
      price: product.variants.edges[0].node.price.amount,
      productId: product.id.split("/").pop(),
      quantity: qty,
      title: product.title,
      variantId: selectedVariant,
    });
  };

  return (
    <View className="px-4">
      <Text
        style={{
          color: theme.colors.text,
          fontSize: 32,
          fontWeight: "500",
        }}
      >
        {product.title}
      </Text>

      <Text
        style={{
          color: theme.colors.textMuted,
          fontSize: 18,
          marginTop: 5,
        }}
      >
        {product.vendor}
      </Text>

      <Text
        style={{
          color: theme.colors.text,
          fontSize: 30,
          marginTop: 25,
        }}
      >
        ${variants[0].node.price.amount}
      </Text>

      <View
        style={{
          height: 1,
          backgroundColor: "#ddd",
          marginVertical: 25,
        }}
      />

      <Text
        style={{
          color: theme.colors.text,
          fontSize: 18,
          lineHeight: 28,
        }}
      >
        {product.description}
      </Text>

      <Text
        style={{
          marginTop: 30,
          fontSize: 18,
          color: theme.colors.text,
        }}
      >
        Denominations
      </Text>

      <View
        style={{
          borderWidth: 1,
          borderColor: "#d1d5db",
          borderRadius: 8,
          marginTop: 10,
        }}
      >
        <Dropdown
          style={{
            height: 52,
            paddingHorizontal: 12,
          }}
          placeholderStyle={{
            fontSize: 16,
          }}
          selectedTextStyle={{
            fontSize: 16,
          }}
          data={data}
          labelField="label"
          valueField="value"
          value={selectedVariant}
          onChange={(item) => {
            setSelectedVariant(item.value);
          }}
        />
      </View>
      <Text
        style={{
          color: "#888",
          marginTop: 25,
        }}
      >
        Out of stock
      </Text>

      <View
        style={{
          height: 1,
          backgroundColor: "#eee",
          marginVertical: 20,
        }}
      />

      <Text
        style={{
          color: theme.colors.text,
          fontSize: 18,
        }}
      >
        Quantity
      </Text>

      <View
        style={{
          flexDirection: "row",
          width: 140,
          height: 50,
          borderWidth: 1,
          borderColor: "#ccc",
          marginTop: 15,
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setQty(Math.max(1, qty - 1))}
        >
          <Text style={{ fontSize: 28 }}>−</Text>
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>{qty}</Text>
        </View>

        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setQty(qty + 1)}
        >
          <Text style={{ fontSize: 28 }}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity className="flex-row items-center mt-8">
        <View className="w-6 h-6 border border-gray-400 mr-3" />

        <Text className="text-lg">I want to send this as a gift</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="mt-8 h-14 border border-gray-300 justify-center items-center"
        onPress={() => addProductToCart(product)}
      >
        <Text className="text-gray-400 text-lg">Add to Bag</Text>
      </TouchableOpacity>

      <TouchableOpacity className="mt-4 h-14 bg-black justify-center items-center">
        <Text className="text-white text-lg">Buy it now</Text>
      </TouchableOpacity>
    </View>
  );
}
