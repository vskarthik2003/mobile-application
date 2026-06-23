import { z } from "zod";

export const SlideshowSchema = z.object({
  autoPlay: z.boolean().default(true),
  interval: z.number().default(5),
  slides: z.array(z.any()).default([
          { id: "1", imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80", title: "Autumn Collection", subtitle: "Pre-order now for 15% off", ctaLabel: "Pre-Order", ctaUrl: "/collections/autumn" },
          { id: "2", imageUrl: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80", title: "Minimal Linens", subtitle: "Breathable designs for clean living", ctaLabel: "Shop Linens", ctaUrl: "/collections/linens" }
        ]),
});

export type SlideshowPropsValidated = z.infer<typeof SlideshowSchema>;
