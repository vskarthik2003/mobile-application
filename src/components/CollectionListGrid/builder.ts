import type { BuilderMetadata } from "../registry";

export const CollectionListGridBuilder: BuilderMetadata = {
  type: "CollectionListGrid",
  label: "Collection List Grid",
  description: "Stiletto theme CollectionListGrid section component.",
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
      defaultValue: "Browse by Theme"
    },
    {
      name: "subtitle",
      label: "Subtitle",
      type: "text",
      defaultValue: "Collections"
    },
    {
      name: "columns",
      label: "Columns",
      type: "number",
      defaultValue: 1
    }
  ]
};
