import { z } from "zod";

export const FeaturedCollectionSliderSchema = z.object({
  collectionId: z.string().default("new-arrivals"),
  title: z.string().default("New Arrivals"),
  subtitle: z.string().default("Trending Styles"),
  limit: z.number().default(6),
  showPrices: z.boolean().default(true),
});

export type FeaturedCollectionSliderPropsValidated = z.infer<typeof FeaturedCollectionSliderSchema>;
