import { z } from "zod";

export const ImageWithTextSchema = z.object({
  imageUrl: z.string().default("https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80"),
  imagePosition: z.enum(["left", "right"]).default("left"),
  title: z.string().default("Handcrafted Elegance"),
  text: z.string().default("Each piece is crafted by local artisans using sustainable processes and premium organic fabrics. Designed to feel luxurious on your skin and last a lifetime."),
  ctaLabel: z.string().default("Our Process"),
  ctaUrl: z.string().default("/about"),
  bgColor: z.string().default(""),
});

export type ImageWithTextPropsValidated = z.infer<typeof ImageWithTextSchema>;
