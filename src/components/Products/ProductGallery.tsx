import { Image } from "expo-image";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

interface ProductGalleryProps {
  product: any;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const flatListRef = useRef<FlatList>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const onScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);

    setActiveIndex(index);
  };

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={product?.images?.edges}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        keyExtractor={(item) => item.node.id}
        onMomentumScrollEnd={onScrollEnd}
        renderItem={({ item }) => (
          <View
            style={{
              width,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: item.node.url }}
              style={{
                width: 300,
                height: 380,
              }}
              contentFit="contain"
              transition={200}
            />
          </View>
        )}
      />

      {/* Pagination */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 15,
          marginBottom: 10,
        }}
      >
        {product?.images?.edges.map((_: any, index: number) => (
          <View
            key={index}
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 4,
              backgroundColor: activeIndex === index ? "#222" : "#CFCFCF",
            }}
          />
        ))}
      </View>
    </View>
  );
}
