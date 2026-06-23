import { z } from "zod";

export const FeaturedCollectionGridSchema = z.object({
  collectionId: z.string().default("summer-essentials"),
  title: z.string().default("Trending Now"),
  subtitle: z.string().default("Featured Collection"),
  limit: z.number().default(4),
  columns: z.number().default(2),
  showPrices: z.boolean().default(true),
});

export type FeaturedCollectionGridPropsValidated = z.infer<typeof FeaturedCollectionGridSchema>;
