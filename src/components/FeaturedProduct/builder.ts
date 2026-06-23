import type { BuilderMetadata } from "../registry";

export const FeaturedProductBuilder: BuilderMetadata = {
  type: "FeaturedProduct",
  label: "Featured Product",
  description: "Stiletto theme FeaturedProduct section component.",
  category: "product",
  fields: [
    {
      name: "productId",
      label: "Product Id",
      type: "text",
      defaultValue: "prod-1"
    },
    {
      name: "showQuantitySelector",
      label: "Show Quantity Selector",
      type: "boolean",
      defaultValue: true
    },
    {
      name: "showDescription",
      label: "Show Description",
      type: "boolean",
      defaultValue: true
    },
    {
      name: "showVariantPicker",
      label: "Show Variant Picker",
      type: "boolean",
      defaultValue: true
    },
    {
      name: "showBuyNow",
      label: "Show Buy Now",
      type: "boolean",
      defaultValue: true
    }
  ]
};
