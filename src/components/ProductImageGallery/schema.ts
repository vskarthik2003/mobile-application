import { z } from "zod";

export const ProductImageGallerySchema = z.object({
  imageUrls: z.array(z.string()).default(["https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80", "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=800&q=80"]),
  dotColor: z.string().default("#E5E7EB"),
  activeDotColor: z.string().default("#E11D48"),
});

export type ProductImageGalleryPropsValidated = z.infer<typeof ProductImageGallerySchema>;
