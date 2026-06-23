import type { BuilderMetadata } from "../registry";

export const ProductImageGalleryBuilder: BuilderMetadata = {
  type: "ProductImageGallery",
  label: "Product Image Gallery",
  description: "Stiletto theme ProductImageGallery section component.",
  category: "product",
  fields: [
    {
      name: "imageUrls",
      label: "Image Urls",
      type: "list",
      defaultValue: ["https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80", "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=800&q=80"]
    },
    {
      name: "dotColor",
      label: "Dot Color",
      type: "text",
      defaultValue: "#E5E7EB"
    },
    {
      name: "activeDotColor",
      label: "Active Dot Color",
      type: "text",
      defaultValue: "#E11D48"
    }
  ]
};
