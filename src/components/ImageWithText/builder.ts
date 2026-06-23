import type { BuilderMetadata } from "../registry";

export const ImageWithTextBuilder: BuilderMetadata = {
  type: "ImageWithText",
  label: "Image With Text",
  description: "Stiletto theme ImageWithText section component.",
  category: "static",
  fields: [
    {
      name: "imageUrl",
      label: "Image Url",
      type: "text",
      defaultValue: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80"
    },
    {
      name: "imagePosition",
      label: "Image Position",
      type: "select",
      defaultValue: "left",
      options: [{ label: "Left", value: "left" }, { label: "Right", value: "right" }]
    },
    {
      name: "title",
      label: "Title",
      type: "text",
      defaultValue: "Handcrafted Elegance"
    },
    {
      name: "text",
      label: "Text",
      type: "text",
      defaultValue: "Each piece is crafted by local artisans using sustainable processes and premium organic fabrics. Designed to feel luxurious on your skin and last a lifetime."
    },
    {
      name: "ctaLabel",
      label: "Cta Label",
      type: "text",
      defaultValue: "Our Process"
    },
    {
      name: "ctaUrl",
      label: "Cta Url",
      type: "text",
      defaultValue: "/about"
    },
    {
      name: "bgColor",
      label: "Bg Color",
      type: "text",
      defaultValue: ""
    }
  ]
};
