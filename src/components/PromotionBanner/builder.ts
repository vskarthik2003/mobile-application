import type { BuilderMetadata } from "../registry";

export const PromotionBannerBuilder: BuilderMetadata = {
  type: "PromotionBanner",
  label: "Promotion Banner",
  description: "Stiletto theme PromotionBanner section component.",
  category: "static",
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      defaultValue: "Special Launch Discount"
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      defaultValue: "Enjoy flat 20% off all new collections."
    },
    {
      name: "badgeText",
      label: "Badge Text",
      type: "text",
      defaultValue: "LIMITED TIME"
    },
    {
      name: "discountCode",
      label: "Discount Code",
      type: "text",
      defaultValue: "STILETTO20"
    },
    {
      name: "bgColor",
      label: "Bg Color",
      type: "text",
      defaultValue: "#F43F5E"
    },
    {
      name: "textColor",
      label: "Text Color",
      type: "text",
      defaultValue: "#FFFFFF"
    },
    {
      name: "imageUrl",
      label: "Image Url",
      type: "text",
      defaultValue: ""
    }
  ]
};
