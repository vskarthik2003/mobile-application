import { z } from "zod";

export const RichTextSchema = z.object({
  title: z.string().default("About Our Brand"),
  subtitle: z.string().default("Modern Minimalism"),
  content: z.string().default("We believe in fashion that makes a statement without shouting. Our collections are designed with clean lines, neutral colors, and subtle accents that elevate your everyday silhouette."),
  alignment: z.enum(["left", "center", "right"]).default("center"),
  ctaLabel: z.string().default(""),
  ctaUrl: z.string().default(""),
});

export type RichTextPropsValidated = z.infer<typeof RichTextSchema>;
