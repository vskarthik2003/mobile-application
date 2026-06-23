import React from "react";
import { ComponentRegistry, SchemaRegistry } from "./registry";
import { ErrorState } from "./primitives";
import type { SectionConfig } from "../schema/app-config";

interface SectionRendererProps {
  section: SectionConfig;
}

export function SectionRenderer({ section }: SectionRendererProps) {
  const Component = ComponentRegistry[section.type];

  if (!Component) {
    return (
      <ErrorState
        message={`Component style "${section.type}" is not registered on this platform.`}
      />
    );
  }

  // Validate props using Zod schemas
  const schema = SchemaRegistry[section.type];
  let resolvedProps = section.props || {};

  if (schema) {
    const parseResult = schema.safeParse(section.props);
    if (parseResult.success) {
      resolvedProps = parseResult.data;
    } else {
      console.warn(
        `[SectionRenderer] Prop validation failed for "${section.type}" (id: ${section.id}). Falling back to raw props. Errors:`,
        JSON.stringify(parseResult.error.format())
      );
    }
  }

  return <Component sectionId={section.id} {...resolvedProps} />;
}
