import AnnouncementBar from "@/src/components/AnnouncementBar";
import { Header } from "@/src/components/Header";
import ScrollableTextSection from "@/src/components/ScrollableTextSection";
import { Text, View } from "react-native";

export default function Home() {
  return (
    <View>
      <AnnouncementBar />
      <Header />
      <ScrollableTextSection />
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-xl font-bold text-blue-500">
          Welcome to Nativewind!
        </Text>
      </View>
    </View>
  );
}
