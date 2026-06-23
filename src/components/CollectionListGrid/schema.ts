import { z } from "zod";

export const CollectionListGridSchema = z.object({
  collectionIds: z.array(z.string()).default(["summer-essentials", "new-arrivals", "best-sellers"]),
  title: z.string().default("Browse by Theme"),
  subtitle: z.string().default("Collections"),
  columns: z.number().default(1),
});

export type CollectionListGridPropsValidated = z.infer<typeof CollectionListGridSchema>;
