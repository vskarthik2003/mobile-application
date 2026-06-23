import { z } from "zod";

export const CountdownBannerSchema = z.object({
  title: z.string().default("Flash Sale Ending Soon"),
  subtitle: z.string().default("Limited Stock"),
  targetDate: z.string().default(new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString()),
  imageUrl: z.string().default("https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"),
  bgColor: z.string().default(""),
  textColor: z.string().default(""),
  ctaLabel: z.string().default("Shop the Sale"),
  ctaUrl: z.string().default("/collections/summer-sale"),
});

export type CountdownBannerPropsValidated = z.infer<typeof CountdownBannerSchema>;
