import { z } from "zod";

export const PromotionBannerSchema = z.object({
  title: z.string().default("Special Launch Discount"),
  description: z.string().default("Enjoy flat 20% off all new collections."),
  badgeText: z.string().default("LIMITED TIME"),
  discountCode: z.string().default("STILETTO20"),
  bgColor: z.string().default("#F43F5E"),
  textColor: z.string().default("#FFFFFF"),
  imageUrl: z.string().default(""),
});

export type PromotionBannerPropsValidated = z.infer<typeof PromotionBannerSchema>;
