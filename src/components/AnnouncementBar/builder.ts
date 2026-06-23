import type { BuilderMetadata } from "../registry";

export const AnnouncementBarBuilder: BuilderMetadata = {
  type: "AnnouncementBar",
  label: "Announcement Bar",
  description: "Stiletto theme AnnouncementBar section component.",
  category: "static",
  fields: [
    {
      name: "messages",
      label: "Messages",
      type: "list",
      defaultValue: ["Hello", "Welcome", "Big Sale Today", "Free Shipping"]
    },
    {
      name: "bgColor",
      label: "Bg Color",
      type: "text",
      defaultValue: "#FAF7C3"
    },
    {
      name: "textColor",
      label: "Text Color",
      type: "text",
      defaultValue: "#242526"
    },
    {
      name: "autoPlay",
      label: "Auto Play",
      type: "boolean",
      defaultValue: true
    },
    {
      name: "timeGap",
      label: "Time Gap",
      type: "number",
      defaultValue: 3
    }
  ]
};
