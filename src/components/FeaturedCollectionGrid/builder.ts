import type { BuilderMetadata } from "../registry";

export const FeaturedCollectionGridBuilder: BuilderMetadata = {
  type: "FeaturedCollectionGrid",
  label: "Featured Collection Grid",
  description: "Stiletto theme FeaturedCollectionGrid section component.",
  category: "collection",
  fields: [
    {
      name: "collectionId",
      label: "Collection Id",
      type: "text",
      defaultValue: "summer-essentials"
    },
    {
      name: "title",
      label: "Title",
      type: "text",
      defaultValue: "Trending Now"
    },
    {
      name: "subtitle",
      label: "Subtitle",
      type: "text",
      defaultValue: "Featured Collection"
    },
    {
      name: "limit",
      label: "Limit",
      type: "number",
      defaultValue: 4
    },
    {
      name: "columns",
      label: "Columns",
      type: "number",
      defaultValue: 2
    },
    {
      name: "showPrices",
      label: "Show Prices",
      type: "boolean",
      defaultValue: true
    }
  ]
};
