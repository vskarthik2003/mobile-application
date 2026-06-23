import { z } from "zod";

export const CollectionListSliderSchema = z.object({
  collectionIds: z.array(z.string()).default(["summer-essentials", "new-arrivals", "best-sellers"]),
  title: z.string().default("Curated Silhouettes"),
  subtitle: z.string().default("Themes"),
});

export type CollectionListSliderPropsValidated = z.infer<typeof CollectionListSliderSchema>;
