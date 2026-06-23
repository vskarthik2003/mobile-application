import type { BuilderMetadata } from "../registry";

export const CollectionListSliderBuilder: BuilderMetadata = {
  type: "CollectionListSlider",
  label: "Collection List Slider",
  description: "Stiletto theme CollectionListSlider section component.",
  category: "collection",
  fields: [
    {
      name: "collectionIds",
      label: "Collection Ids",
      type: "list",
      defaultValue: ["summer-essentials", "new-arrivals", "best-sellers"]
    },
    {
      name: "title",
      label: "Title",
      type: "text",
      defaultValue: "Curated Silhouettes"
    },
    {
      name: "subtitle",
      label: "Subtitle",
      type: "text",
      defaultValue: "Themes"
    }
  ]
};
