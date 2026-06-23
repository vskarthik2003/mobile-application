export interface ImageHeroProps {
  sectionId?: string;
  imageUrl?: string;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  height?: number;
  overlayOpacity?: number;
  alignment?: "left" | "center" | "right";
}
