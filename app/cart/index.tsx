import { useCart } from "@/src/providers/CartProvider";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function CartScreen() {
  const router = useRouter();

  const { cart, increment, decrement, removeCartItem, subtotal } = useCart();

  return (
    <View className="flex-1 bg-white px-4 pt-12">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-4xl font-semibold">
          Your Cart ({cart.length})
        </Text>

        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-3xl">✕</Text>
        </TouchableOpacity>
      </View>

      {/* Cart Items */}
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className="flex-row mb-6">
            <Image
              source={{ uri: item.image }}
              style={{
                width: 100,
                height: 100,
              }}
            />

            <View className="flex-1 ml-4">
              <Text className="text-xl font-medium">{item.title}</Text>

              <Text className="text-lg mt-2">${item.price}</Text>

              <View className="flex-row items-center mt-4">
                <TouchableOpacity
                  className="border w-10 h-10 justify-center items-center"
                  onPress={() => decrement(item.id)}
                >
                  <Text>-</Text>
                </TouchableOpacity>

                <Text className="mx-4">{item.quantity}</Text>

                <TouchableOpacity
                  className="border w-10 h-10 justify-center items-center"
                  onPress={() => increment(item.id)}
                >
                  <Text>+</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="ml-auto"
                  onPress={() => removeCartItem(item.id)}
                >
                  <Text className="underline">Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      {/* Footer */}
      <View className="border-t pt-4">
        <View className="flex-row justify-between mb-4">
          <Text className="text-2xl font-semibold">Subtotal</Text>

          <Text className="text-2xl font-semibold">${subtotal.toFixed(2)}</Text>
        </View>

        <TouchableOpacity className="bg-black py-4 rounded">
          <Text className="text-white text-center text-xl font-semibold">
            Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
