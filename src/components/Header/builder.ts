import type { BuilderMetadata } from "../registry";

export const HeaderBuilder: BuilderMetadata = {
  type: "Header",
  label: "Header",
  description: "Stiletto theme Header section component.",
  category: "global",
  fields: [
    {
      name: "logoUrl",
      label: "Logo Url",
      type: "text",
      defaultValue: ""
    },
    {
      name: "showSearch",
      label: "Show Search",
      type: "boolean",
      defaultValue: true
    },
    {
      name: "showCart",
      label: "Show Cart",
      type: "boolean",
      defaultValue: true
    },
    {
      name: "showMenu",
      label: "Show Menu",
      type: "boolean",
      defaultValue: true
    },
    {
      name: "layout",
      label: "Layout",
      type: "select",
      defaultValue: "default",
      options: [{ label: "Default", value: "default" }, { label: "Center-logo", value: "center-logo" }]
    }
  ]
};
