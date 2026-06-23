import type { BuilderMetadata } from "../registry";

export const TestimonialsBuilder: BuilderMetadata = {
  type: "Testimonials",
  label: "Testimonials",
  description: "Stiletto theme Testimonials section component.",
  category: "static",
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      defaultValue: "What Our Customers Say"
    },
    {
      name: "subtitle",
      label: "Subtitle",
      type: "text",
      defaultValue: "Reviews"
    },
    {
      name: "bgColor",
      label: "Bg Color",
      type: "text",
      defaultValue: ""
    },
    {
      name: "testimonials",
      label: "Testimonials",
      type: "list",
      defaultValue: [
          { id: "1", author: "Aditi S.", title: "Verified Buyer", rating: 5, reviewText: "The Silk Slip Dress fits like a dream! The fabric is incredibly soft and looks so luxurious. Highly recommend!", avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&q=80" },
          { id: "2", author: "Rohan M.", title: "Stylist", rating: 5, reviewText: "Superb quality Chelsea boots. Extremely comfortable and the leather breaks in beautifully.", avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&q=80" }
        ]
    }
  ]
};
