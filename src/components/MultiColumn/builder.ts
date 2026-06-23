import type { BuilderMetadata } from "../registry";

export const MultiColumnBuilder: BuilderMetadata = {
  type: "MultiColumn",
  label: "Multi Column",
  description: "Stiletto theme MultiColumn section component.",
  category: "static",
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      defaultValue: "Why Choose Us"
    },
    {
      name: "subtitle",
      label: "Subtitle",
      type: "text",
      defaultValue: "The Stiletto Promise"
    },
    {
      name: "columnCount",
      label: "Column Count",
      type: "number",
      defaultValue: 3
    },
    {
      name: "columns",
      label: "Columns",
      type: "list",
      defaultValue: [
          { id: "1", title: "Free Shipping", text: "On all orders above ₹5000", icon: "airplane-outline" },
          { id: "2", title: "Easy Returns", text: "30-day hassle-free exchange policy", icon: "refresh-outline" },
          { id: "3", title: "Premium Quality", text: "Made with 100% certified organic fabrics", icon: "ribbon-outline" }
        ]
    }
  ]
};
