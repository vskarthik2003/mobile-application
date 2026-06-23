import AnnouncementBar from "@/src/components/AnnouncementBar";
import { Header } from "@/src/components/Header";
import ScrollableTextSection from "@/src/components/ScrollableTextSection";
import { ScrollView, View } from "react-native";

export default function Home() {
  return (
    <View>
      <AnnouncementBar />
      <Header />
      <ScrollView className="bg-black">
        <ScrollableTextSection />
      </ScrollView>
    </View>
  );
}
