import { z } from "zod";

export const ThemeSchema = z.object({
  colors: z.object({
    primary: z.string(),
    background: z.string(),
    surface: z.string(),
    text: z.string(),
    textMuted: z.string(),
    border: z.string(),
  }),
  radius: z.object({
    sm: z.number(),
    md: z.number(),
    lg: z.number(),
  }),
  announcementBar: z.object({
    textColor: z.string().default("#242526"),
    bgColor: z.string().default("#FAF7C3"),
    timeGap: z.number().default(2),
    autoPlay: z.boolean().default(true),
    messages: z
      .array(z.string())
      .default(["Hello", "Welcome", "Big Sale Today", "Free Shipping"]),
  }),
});

export const BrandingSchema = z.object({
  appName: z.string(),
  logoUrl: z.string().optional(),
});

export const NavigationItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  icon: z.string().default("home-outline"),
  visible: z.boolean().default(true),
  order: z.number().int().optional(),
  badge: z.string().optional(),
});

export const SectionSchema = z.object({
  id: z.string(),
  type: z.string(),
  version: z.number().optional(),
  props: z.record(z.string(), z.unknown()).default({}),
});

export const PageSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  sections: z.array(SectionSchema),
});

export const AppSettingsSchema = z.object({
  locale: z.string().default("en-US"),
  currency: z.string().default("USD"),
  previewMode: z.boolean().default(true),
});

export const AppConfigSchema = z.object({
  schemaVersion: z.literal("1.0.0"),
  revision: z.number().int(),
  navigation: z.array(NavigationItemSchema).min(1).max(5),
  pages: z.array(PageSchema),
  /** Collection landing page sections — keyed by collection handle, or "default" for fallback */
  collectionPages: z.record(z.string(), z.array(SectionSchema)).optional(),
  /** Product detail page sections — applies to all PDPs */
  productPage: z.array(SectionSchema).optional(),
  theme: ThemeSchema,
  branding: BrandingSchema,
  settings: AppSettingsSchema,
});

export type Theme = z.infer<typeof ThemeSchema>;
export type Branding = z.infer<typeof BrandingSchema>;
export type NavigationItem = z.infer<typeof NavigationItemSchema>;
export type SectionConfig = z.infer<typeof SectionSchema>;
export type PageConfig = z.infer<typeof PageSchema>;
export type AppSettings = z.infer<typeof AppSettingsSchema>;
export type AppConfig = z.infer<typeof AppConfigSchema>;

export function parseAppConfig(input: unknown): AppConfig {
  return AppConfigSchema.parse(input);
}

// scrollableTextSec: z.object({
//     bgColor: z.string().default("#242526"),
//     textColor: z.string().default("#faf7c3"),
//     duration: z.number().default(10),
//     direction: z.enum(["ltr", "rtl"]),
//   }),
