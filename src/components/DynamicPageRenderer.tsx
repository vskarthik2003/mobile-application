import React, { memo } from "react";
import { ScrollView, View, RefreshControl, ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { SectionRenderer } from "@/src/components/SectionRenderer";
import type { SectionConfig } from "@/src/schema/app-config";
import { useTheme } from "@/src/providers/ThemeProvider";

// ─── Props ──────────────────────────────────────────────────────────────────

interface DynamicPageRendererProps {
  sections: SectionConfig[];
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
  refreshing?: boolean;
  onRefresh?: () => void;
  scrollable?: boolean;
  /** Rendered ABOVE the section scroll (sticky header use-case) */
  header?: React.ReactNode;
  /** Rendered BELOW all sections inside the scroll */
  footer?: React.ReactNode;
}

// ─── Loading Skeleton ────────────────────────────────────────────────────────

const PageSkeleton = memo(function PageSkeleton() {
  return (
    <View className="flex-1 gap-4 p-4 animate-pulse">
      {[180, 120, 220, 100].map((h, i) => (
        <View key={i} className="rounded-xl bg-gray-100" style={{ height: h }} />
      ))}
    </View>
  );
});

// ─── Error Banner ────────────────────────────────────────────────────────────

const PageError = memo(function PageError({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  const { theme } = useTheme();
  return (
    <View className="flex-1 items-center justify-center px-8 gap-4">
      <View className="w-16 h-16 rounded-full items-center justify-center bg-red-50">
        <Text className="text-3xl">⚠️</Text>
      </View>
      <Text className="text-base font-semibold text-center" style={{ color: theme.colors.text }}>
        Something went wrong
      </Text>
      <Text className="text-sm text-center" style={{ color: theme.colors.textMuted }}>
        {message}
      </Text>
      {onRetry && (
        <TouchableOpacity
          onPress={onRetry}
          className="px-6 py-2.5 rounded-full"
          style={{ backgroundColor: theme.colors.primary }}
          activeOpacity={0.8}
        >
          <Text className="text-white font-semibold text-sm">Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
});

// ─── Empty State ─────────────────────────────────────────────────────────────

const PageEmpty = memo(function PageEmpty({ message }: { message: string }) {
  const { theme } = useTheme();
  return (
    <View className="flex-1 items-center justify-center px-8 gap-3">
      <Text className="text-4xl">📭</Text>
      <Text className="text-base font-semibold text-center" style={{ color: theme.colors.text }}>
        Nothing here yet
      </Text>
      <Text className="text-sm text-center" style={{ color: theme.colors.textMuted }}>
        {message}
      </Text>
    </View>
  );
});

// ─── Main Renderer ───────────────────────────────────────────────────────────

export const DynamicPageRenderer = memo(function DynamicPageRenderer({
  sections,
  loading = false,
  error = null,
  emptyMessage = "This page has no sections configured.",
  refreshing = false,
  onRefresh,
  scrollable = true,
  header,
  footer,
}: DynamicPageRendererProps) {
  const { theme } = useTheme();

  // Loading state
  if (loading && sections.length === 0) {
    return (
      <View className="flex-1" style={{ backgroundColor: theme.colors.background }}>
        {header}
        <PageSkeleton />
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View className="flex-1" style={{ backgroundColor: theme.colors.background }}>
        {header}
        <PageError message={error} onRetry={onRefresh} />
      </View>
    );
  }

  // Empty state
  if (!sections || sections.length === 0) {
    return (
      <View className="flex-1" style={{ backgroundColor: theme.colors.background }}>
        {header}
        <PageEmpty message={emptyMessage} />
      </View>
    );
  }

  const content = (
    <>
      {sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
      {footer}
    </>
  );

  if (!scrollable) {
    return (
      <View className="flex-1" style={{ backgroundColor: theme.colors.background }}>
        {header}
        {content}
      </View>
    );
  }

  return (
    <View className="flex-1" style={{ backgroundColor: theme.colors.background }}>
      {header}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.colors.primary}
            />
          ) : undefined
        }
      >
        {loading && (
          <View className="py-3 items-center">
            <ActivityIndicator size="small" color={theme.colors.primary} />
          </View>
        )}
        {content}
      </ScrollView>
    </View>
  );
});
