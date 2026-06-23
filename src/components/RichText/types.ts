export interface RichTextProps {
  sectionId?: string;
  title?: string;
  subtitle?: string;
  content?: string;
  alignment?: "left" | "center" | "right";
  ctaLabel?: string;
  ctaUrl?: string;
}
