import React, { useEffect } from "react";
import {
  Alert,
  PermissionsAndroid,
  Platform,
  ScrollView,
  View,
} from "react-native";

import AnnouncementBar from "@/src/components/AnnouncementBar";
import FeaturedCollectionGrid from "@/src/components/FeaturedCollectionGrid";
import { Header } from "@/src/components/Header";
import ScrollableTextSection from "@/src/components/ScrollableTextSection";

import firestore from "@react-native-firebase/firestore";
import messaging from "@react-native-firebase/messaging";
import DeviceInfo from "react-native-device-info";

export default function Index() {
  const saveFCMToken = async (token: string) => {
    try {
      const deviceId = await DeviceInfo.getUniqueId();
      const deviceName = await DeviceInfo.getDeviceName();
      const appVersion = DeviceInfo.getVersion();
      const buildNumber = DeviceInfo.getBuildNumber();
      const osVersion = DeviceInfo.getSystemVersion();

      await firestore().collection("devices").doc(deviceId).set(
        {
          deviceId,
          fcmToken: token,
          platform: Platform.OS,
          deviceName,
          appVersion,
          buildNumber,
          osVersion,
          notificationsEnabled: true,
          updatedAt: firestore.FieldValue.serverTimestamp(),
          createdAt: firestore.FieldValue.serverTimestamp(),
        },
        { merge: true },
      );

      console.log("Token saved to Firestore");
    } catch (error) {
      console.log("Firestore Error:", error);
    }
  };

  const registerDevice = async () => {
    try {
      await messaging().registerDeviceForRemoteMessages();

      const token = await messaging().getToken();

      console.log("FCM Token:", token);

      await saveFCMToken(token);
    } catch (error) {
      console.log("Token Error:", error);
    }
  };

  const requestPermission = async () => {
    try {
      // Android 13+
      if (Platform.OS === "android" && Platform.Version >= 33) {
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );

        if (result !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert("Notification permission denied");
          return;
        }
      }

      await registerDevice();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    requestPermission();

    const unsubscribe = messaging().onTokenRefresh(async (newToken) => {
      console.log("New Token:", newToken);

      await saveFCMToken(newToken);
    });

    return unsubscribe;
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <AnnouncementBar />
      <Header />
      <ScrollView className="bg-black">
        <ScrollableTextSection />
        <FeaturedCollectionGrid />
      </ScrollView>
    </View>
  );
}
