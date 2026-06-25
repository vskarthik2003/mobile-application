import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Stack, router } from "expo-router";
import { useAuth } from "@/src/providers/AuthProvider";
import { useTheme } from "@/src/providers/ThemeProvider";

export default function AuthScreen() {
  const { login, isLoading } = useAuth();
  const { theme } = useTheme();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert("Missing Fields", "Please fill in all required fields.");
      return;
    }
    try {
      await login(email, password);
      router.back();
    } catch (e) {
      Alert.alert("Error", "Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: mode === "login" ? "Sign In" : "Create Account",
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerShadowVisible: false,
          headerBackTitle: "",
        }}
      />
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: theme.colors.background }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, padding: 24 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo / Title */}
          <View style={{ alignItems: "center", marginBottom: 32, marginTop: 24, gap: 8 }}>
            <View style={{ width: 64, height: 64, borderRadius: 16, backgroundColor: theme.colors.primary + "20", alignItems: "center", justifyContent: "center" }}>
              <Text style={{ fontSize: 28 }}>✦</Text>
            </View>
            <Text style={{ fontSize: 22, fontWeight: "800", color: theme.colors.text }}>
              {mode === "login" ? "Welcome back" : "Join us"}
            </Text>
            <Text style={{ fontSize: 14, color: theme.colors.textMuted, textAlign: "center" }}>
              {mode === "login"
                ? "Sign in to access your account and orders."
                : "Create an account for faster checkout and exclusive offers."}
            </Text>
          </View>

          {/* Fields */}
          <View style={{ gap: 14 }}>
            {mode === "register" && (
              <>
                <InputField label="First Name" value={firstName} onChangeText={setFirstName} placeholder="Jane" theme={theme} />
                <InputField label="Last Name" value={lastName} onChangeText={setLastName} placeholder="Merchant" theme={theme} />
              </>
            )}
            <InputField label="Email" value={email} onChangeText={setEmail} placeholder="you@email.com" keyboardType="email-address" autoCapitalize="none" theme={theme} />
            <InputField label="Password" value={password} onChangeText={setPassword} placeholder="••••••••" secureTextEntry theme={theme} />
          </View>

          {/* CTA */}
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isLoading}
            style={{
              marginTop: 28,
              backgroundColor: theme.colors.primary,
              paddingVertical: 16,
              borderRadius: theme.radius.lg,
              alignItems: "center",
            }}
            activeOpacity={0.85}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={{ color: "#fff", fontWeight: "700", fontSize: 15 }}>
                {mode === "login" ? "Sign In" : "Create Account"}
              </Text>
            )}
          </TouchableOpacity>

          {/* Toggle mode */}
          <TouchableOpacity
            onPress={() => setMode(mode === "login" ? "register" : "login")}
            style={{ marginTop: 20, alignItems: "center" }}
            activeOpacity={0.7}
          >
            <Text style={{ color: theme.colors.textMuted, fontSize: 13 }}>
              {mode === "login" ? "Don't have an account? " : "Already have an account? "}
              <Text style={{ color: theme.colors.primary, fontWeight: "700" }}>
                {mode === "login" ? "Register" : "Sign In"}
              </Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  theme,
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: any;
  autoCapitalize?: any;
  theme: any;
}) {
  return (
    <View style={{ gap: 6 }}>
      <Text style={{ color: theme.colors.text, fontSize: 13, fontWeight: "600" }}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textMuted}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize ?? "words"}
        style={{
          backgroundColor: theme.colors.surface,
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.md,
          paddingHorizontal: 14,
          paddingVertical: 12,
          fontSize: 15,
          color: theme.colors.text,
        }}
      />
    </View>
  );
}
