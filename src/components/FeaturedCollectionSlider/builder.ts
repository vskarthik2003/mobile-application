import type { BuilderMetadata } from "../registry";

export const FeaturedCollectionSliderBuilder: BuilderMetadata = {
  type: "FeaturedCollectionSlider",
  label: "Featured Collection Slider",
  description: "Stiletto theme FeaturedCollectionSlider section component.",
  category: "collection",
  fields: [
    {
      name: "collectionId",
      label: "Collection Id",
      type: "text",
      defaultValue: "new-arrivals"
    },
    {
      name: "title",
      label: "Title",
      type: "text",
      defaultValue: "New Arrivals"
    },
    {
      name: "subtitle",
      label: "Subtitle",
      type: "text",
      defaultValue: "Trending Styles"
    },
    {
      name: "limit",
      label: "Limit",
      type: "number",
      defaultValue: 6
    },
    {
      name: "showPrices",
      label: "Show Prices",
      type: "boolean",
      defaultValue: true
    }
  ]
};
