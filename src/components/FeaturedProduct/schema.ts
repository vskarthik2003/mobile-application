import { z } from "zod";

export const FeaturedProductSchema = z.object({
  productId: z.string().default("prod-1"),
  showQuantitySelector: z.boolean().default(true),
  showDescription: z.boolean().default(true),
  showVariantPicker: z.boolean().default(true),
  showBuyNow: z.boolean().default(true),
});

export type FeaturedProductPropsValidated = z.infer<typeof FeaturedProductSchema>;
