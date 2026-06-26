import AnnouncementBar from "@/src/components/AnnouncementBar";
import FeaturedCollectionGrid from "@/src/components/FeaturedCollectionGrid";
import { Header } from "@/src/components/Header";
import ScrollableTextSection from "@/src/components/ScrollableTextSection";
import React from "react";
import { ScrollView, View } from "react-native";

export default function index() {
  return (
    <View>
      <AnnouncementBar />
      <Header />
      <ScrollView className="bg-black">
        <ScrollableTextSection />
        <FeaturedCollectionGrid />
      </ScrollView>
    </View>
  );
}
