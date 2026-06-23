import type { BuilderMetadata } from "../registry";

export const SlideshowBuilder: BuilderMetadata = {
  type: "Slideshow",
  label: "Slideshow",
  description: "Stiletto theme Slideshow section component.",
  category: "promotional",
  fields: [
    {
      name: "autoPlay",
      label: "Auto Play",
      type: "boolean",
      defaultValue: true
    },
    {
      name: "interval",
      label: "Interval",
      type: "number",
      defaultValue: 5
    },
    {
      name: "slides",
      label: "Slides",
      type: "list",
      defaultValue: [
          { id: "1", imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80", title: "Autumn Collection", subtitle: "Pre-order now for 15% off", ctaLabel: "Pre-Order", ctaUrl: "/collections/autumn" },
          { id: "2", imageUrl: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80", title: "Minimal Linens", subtitle: "Breathable designs for clean living", ctaLabel: "Shop Linens", ctaUrl: "/collections/linens" }
        ]
    }
  ]
};
