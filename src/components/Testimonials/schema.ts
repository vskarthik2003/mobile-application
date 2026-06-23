import { z } from "zod";

export const TestimonialsSchema = z.object({
  title: z.string().default("What Our Customers Say"),
  subtitle: z.string().default("Reviews"),
  bgColor: z.string().default(""),
  testimonials: z.array(z.any()).default([
          { id: "1", author: "Aditi S.", title: "Verified Buyer", rating: 5, reviewText: "The Silk Slip Dress fits like a dream! The fabric is incredibly soft and looks so luxurious. Highly recommend!", avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&q=80" },
          { id: "2", author: "Rohan M.", title: "Stylist", rating: 5, reviewText: "Superb quality Chelsea boots. Extremely comfortable and the leather breaks in beautifully.", avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&q=80" }
        ]),
});

export type TestimonialsPropsValidated = z.infer<typeof TestimonialsSchema>;
