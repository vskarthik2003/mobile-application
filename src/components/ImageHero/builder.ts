import type { BuilderMetadata } from "../registry";

export const ImageHeroBuilder: BuilderMetadata = {
  type: "ImageHero",
  label: "Image Hero",
  description: "Stiletto theme ImageHero section component.",
  category: "static",
  fields: [
    {
      name: "imageUrl",
      label: "Image Url",
      type: "text",
      defaultValue: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
    },
    {
      name: "title",
      label: "Title",
      type: "text",
      defaultValue: "Elevate Your Style"
    },
    {
      name: "subtitle",
      label: "Subtitle",
      type: "text",
      defaultValue: "Discover our new seasonal arrival collection."
    },
    {
      name: "ctaLabel",
      label: "Cta Label",
      type: "text",
      defaultValue: "Shop Collection"
    },
    {
      name: "ctaUrl",
      label: "Cta Url",
      type: "text",
      defaultValue: "/collections/new-in"
    },
    {
      name: "height",
      label: "Height",
      type: "number",
      defaultValue: 300
    },
    {
      name: "overlayOpacity",
      label: "Overlay Opacity",
      type: "number",
      defaultValue: 0.4
    },
    {
      name: "alignment",
      label: "Alignment",
      type: "select",
      defaultValue: "center",
      options: [{ label: "Left", value: "left" }, { label: "Center", value: "center" }, { label: "Right", value: "right" }]
    }
  ]
};
