import type { BuilderMetadata } from "../registry";

export const CountdownBannerBuilder: BuilderMetadata = {
  type: "CountdownBanner",
  label: "Countdown Banner",
  description: "Stiletto theme CountdownBanner section component.",
  category: "promotional",
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      defaultValue: "Flash Sale Ending Soon"
    },
    {
      name: "subtitle",
      label: "Subtitle",
      type: "text",
      defaultValue: "Limited Stock"
    },
    {
      name: "targetDate",
      label: "Target Date",
      type: "text",
      defaultValue: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString()
    },
    {
      name: "imageUrl",
      label: "Image Url",
      type: "text",
      defaultValue: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
    },
    {
      name: "bgColor",
      label: "Bg Color",
      type: "text",
      defaultValue: ""
    },
    {
      name: "textColor",
      label: "Text Color",
      type: "text",
      defaultValue: ""
    },
    {
      name: "ctaLabel",
      label: "Cta Label",
      type: "text",
      defaultValue: "Shop the Sale"
    },
    {
      name: "ctaUrl",
      label: "Cta Url",
      type: "text",
      defaultValue: "/collections/summer-sale"
    }
  ]
};
