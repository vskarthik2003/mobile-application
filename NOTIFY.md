# React Native Firebase Push Notification Setup

## Architecture

```
React Native App
        │
        │ Get FCM Token
        ▼
Firestore (devices collection)
        │
        ▼
Node.js Backend
(Firebase Admin SDK)
        │
        ▼
Firebase Cloud Messaging
        │
        ▼
Android / iOS Device
```

---

# Step 1 - Create Firebase Project

- Create a Firebase Project
- Enable Firestore Database
- Enable Cloud Messaging

---

# Step 2 - Register Android App

Package Name

```
com.karthi_vs.zuperapps_mobile_builder
```

Download

```
google-services.json
```

Place it inside

```
android/app/google-services.json
```

---

# Step 3 - Register iOS App

Download

```
GoogleService-Info.plist
```

Place it inside

```
ios/GoogleService-Info.plist
```

---

# Step 4 - Install Packages

```bash
npm install @react-native-firebase/app
npm install @react-native-firebase/messaging
npm install @react-native-firebase/firestore
npm install react-native-device-info
```

Generate native folders

```bash
npx expo prebuild
```

Clean Android

```bash
cd android
./gradlew clean
cd ..
```

---

# Step 5 - Android Permission

Android 13+

```ts
if (Platform.OS === "android" && Platform.Version >= 33) {
  await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  );
}
```

---

# Step 6 - Register Device

```ts
await messaging().registerDeviceForRemoteMessages();
```

---

# Step 7 - Get FCM Token

```ts
const token = await messaging().getToken();

console.log(token);
```

---

# Step 8 - Firestore Structure

Collection

```
devices
```

Document ID

```
deviceId
```

Example

```
devices
    |
    |-- deviceId
          |
          |-- deviceId
          |-- userId
          |-- fcmToken
          |-- platform
          |-- deviceName
          |-- appVersion
          |-- buildNumber
          |-- osVersion
          |-- notificationsEnabled
          |-- createdAt
          |-- updatedAt
```

---

# Step 9 - Save Token

```ts
await firestore().collection("devices").doc(deviceId).set(
  {
    deviceId,
    userId,
    fcmToken: token,
    platform: Platform.OS,
    deviceName,
    appVersion,
    buildNumber,
    osVersion,
    notificationsEnabled: true,
    createdAt: firestore.FieldValue.serverTimestamp(),
    updatedAt: firestore.FieldValue.serverTimestamp(),
  },
  { merge: true },
);
```

---

# Step 10 - Update Token

```ts
messaging().onTokenRefresh(async (token) => {
  await saveFCMToken(token);
});
```

---

# Step 11 - Foreground Notification

```ts
messaging().onMessage(async (remoteMessage) => {
  console.log(remoteMessage);
});
```

---

# Step 12 - Background Notification

```ts
messaging().setBackgroundMessageHandler(async (remoteMessage) => {});
```

---

# Step 13 - Notification Click

App in Background

```ts
messaging().onNotificationOpenedApp((remoteMessage) => {});
```

App Closed

```ts
const message = await messaging().getInitialNotification();
```

---

# Step 14 - Backend

Install

```bash
npm install firebase-admin
```

Download

```
serviceAccountKey.json
```

Initialize

```js
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
```

---

# Step 15 - Send Notification

```js
const message = {
  token,
  notification: {
    title: "Hello",
    body: "Welcome to ZuperApps",
  },
  data: {
    screen: "Home",
  },
};

await admin.messaging().send(message);
```

---

# Firestore Best Structure

```
users
    |
    |-- uid
          |
          |-- name
          |-- email
          |-- phone

devices
    |
    |-- deviceId
          |
          |-- userId
          |-- fcmToken
          |-- platform
          |-- deviceName
          |-- appVersion
          |-- osVersion
          |-- notificationsEnabled
          |-- updatedAt

notifications
    |
    |-- notificationId
          |
          |-- userId
          |-- title
          |-- body
          |-- type
          |-- status
          |-- sentAt
          |-- readAt
```

---

# Production Best Practices

✅ One Firestore document per device

✅ Store FCM token

✅ Update token on refresh

✅ Remove invalid tokens

✅ Never expose serviceAccountKey.json

✅ Send notifications only from backend

✅ Handle foreground notifications

✅ Handle background notifications

✅ Handle terminated app notifications

✅ Create Android notification channels

✅ Keep notification history if required

---

# Complete Flow

```
User Opens App
        │
        ▼
Ask Notification Permission
        │
        ▼
Register Device
        │
        ▼
Get FCM Token
        │
        ▼
Save Token in Firestore
        │
        ▼
User Uses App
        │
        ▼
Backend Reads Token
        │
        ▼
Firebase Cloud Messaging
        │
        ▼
Device Receives Notification
```

---

# Notification Icon

android/app/src/main/AndroidManifest.xml

<manifest
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

<meta-data
    android:name="com.google.firebase.messaging.default_notification_color"
    android:resource="@color/notification_icon_color" />

<meta-data
    android:name="com.google.firebase.messaging.default_notification_color"
    android:resource="@color/notification_icon_color"
    tools:replace="android:resource" />
