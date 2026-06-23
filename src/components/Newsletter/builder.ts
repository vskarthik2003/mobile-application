import type { BuilderMetadata } from "../registry";

export const NewsletterBuilder: BuilderMetadata = {
  type: "Newsletter",
  label: "Newsletter",
  description: "Stiletto theme Newsletter section component.",
  category: "global",
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      defaultValue: "Subscribe to Newsletter"
    },
    {
      name: "subtitle",
      label: "Subtitle",
      type: "text",
      defaultValue: "Stay Updated"
    },
    {
      name: "placeholder",
      label: "Placeholder",
      type: "text",
      defaultValue: "Enter your email address"
    },
    {
      name: "buttonText",
      label: "Button Text",
      type: "text",
      defaultValue: "Join Now"
    },
    {
      name: "successMessage",
      label: "Success Message",
      type: "text",
      defaultValue: "Thank you for subscribing!"
    },
    {
      name: "bgColor",
      label: "Bg Color",
      type: "text",
      defaultValue: ""
    }
  ]
};
