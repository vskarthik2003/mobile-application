import type { BuilderMetadata } from "../registry";

export const RichTextBuilder: BuilderMetadata = {
  type: "RichText",
  label: "Rich Text",
  description: "Stiletto theme RichText section component.",
  category: "static",
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      defaultValue: "About Our Brand"
    },
    {
      name: "subtitle",
      label: "Subtitle",
      type: "text",
      defaultValue: "Modern Minimalism"
    },
    {
      name: "content",
      label: "Content",
      type: "text",
      defaultValue: "We believe in fashion that makes a statement without shouting. Our collections are designed with clean lines, neutral colors, and subtle accents that elevate your everyday silhouette."
    },
    {
      name: "alignment",
      label: "Alignment",
      type: "select",
      defaultValue: "center",
      options: [{ label: "Left", value: "left" }, { label: "Center", value: "center" }, { label: "Right", value: "right" }]
    },
    {
      name: "ctaLabel",
      label: "Cta Label",
      type: "text",
      defaultValue: ""
    },
    {
      name: "ctaUrl",
      label: "Cta Url",
      type: "text",
      defaultValue: ""
    }
  ]
};
