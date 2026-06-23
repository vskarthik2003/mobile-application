import { z } from "zod";

export const ImageHeroSchema = z.object({
  imageUrl: z.string().default("https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"),
  title: z.string().default("Elevate Your Style"),
  subtitle: z.string().default("Discover our new seasonal arrival collection."),
  ctaLabel: z.string().default("Shop Collection"),
  ctaUrl: z.string().default("/collections/new-in"),
  height: z.number().default(300),
  overlayOpacity: z.number().default(0.4),
  alignment: z.enum(["left", "center", "right"]).default("center"),
});

export type ImageHeroPropsValidated = z.infer<typeof ImageHeroSchema>;
