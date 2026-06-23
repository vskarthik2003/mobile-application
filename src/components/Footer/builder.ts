import type { BuilderMetadata } from "../registry";

export const FooterBuilder: BuilderMetadata = {
  type: "Footer",
  label: "Footer",
  description: "Stiletto theme Footer section component.",
  category: "global",
  fields: [
    {
      name: "text",
      label: "Text",
      type: "text",
      defaultValue: "Your destination for minimal premium wardrobe staples."
    },
    {
      name: "showSocials",
      label: "Show Socials",
      type: "boolean",
      defaultValue: true
    },
    {
      name: "copyrightText",
      label: "Copyright Text",
      type: "text",
      defaultValue: "© 2026 Stiletto Inc. All rights reserved."
    },
    {
      name: "paymentIcons",
      label: "Payment Icons",
      type: "list",
      defaultValue: ["logo-visa", "logo-mastercard", "card-outline"]
    }
  ]
};
