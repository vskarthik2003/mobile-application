import { type ComponentType } from "react";
import { type z } from "zod";

// Imports
import {
  AnnouncementBar,
  AnnouncementBarBuilder,
  AnnouncementBarSchema,
} from "./AnnouncementBar";
import { ImageHero, ImageHeroBuilder, ImageHeroSchema } from "./ImageHero";
import {
  ImageWithText,
  ImageWithTextBuilder,
  ImageWithTextSchema,
} from "./ImageWithText";
import {
  MultiColumn,
  MultiColumnBuilder,
  MultiColumnSchema,
} from "./MultiColumn";
import {
  PromotionBanner,
  PromotionBannerBuilder,
  PromotionBannerSchema,
} from "./PromotionBanner";
import { RichText, RichTextBuilder, RichTextSchema } from "./RichText";
import {
  Testimonials,
  TestimonialsBuilder,
  TestimonialsSchema,
} from "./Testimonials";

import {
  CollectionListGrid,
  CollectionListGridBuilder,
  CollectionListGridSchema,
} from "./CollectionListGrid";
import {
  CollectionListSlider,
  CollectionListSliderBuilder,
  CollectionListSliderSchema,
} from "./CollectionListSlider";
import {
  FeaturedCollectionGrid,
  FeaturedCollectionGridBuilder,
  FeaturedCollectionGridSchema,
} from "./FeaturedCollectionGrid";
import {
  FeaturedCollectionSlider,
  FeaturedCollectionSliderBuilder,
  FeaturedCollectionSliderSchema,
} from "./FeaturedCollectionSlider";

import {
  FeaturedProduct,
  FeaturedProductBuilder,
  FeaturedProductSchema,
} from "./FeaturedProduct";
import {
  ProductImageGallery,
  ProductImageGalleryBuilder,
  ProductImageGallerySchema,
} from "./ProductImageGallery";

import { Footer, FooterBuilder, FooterSchema } from "./Footer";
import { Header, HeaderBuilder, HeaderSchema } from "./Header";
import { Newsletter, NewsletterBuilder, NewsletterSchema } from "./Newsletter";

import {
  CountdownBanner,
  CountdownBannerBuilder,
  CountdownBannerSchema,
} from "./CountdownBanner";
import {
  ScrollableTextSection,
  ScrollableTextSectionBuilder,
  ScrollableTextSectionSchema,
} from "./ScrollableTextSection";
import { Slideshow, SlideshowBuilder, SlideshowSchema } from "./Slideshow";

export interface BuilderField {
  name: string;
  label: string;
  type:
    | "text"
    | "number"
    | "boolean"
    | "color"
    | "select"
    | "image"
    | "list"
    | "object";
  defaultValue: any;
  options?: { label: string; value: any }[];
  fields?: BuilderField[];
}

export interface BuilderMetadata {
  type: string;
  label: string;
  description: string;
  icon?: string;
  category: "static" | "collection" | "product" | "global" | "promotional";
  fields: BuilderField[];
}

export interface ScrollableTextSectionMetadata {
  bgColor: string;
  textColor: string;
  duration: number;
  direction: "ltr" | "rtl";
}

export const ComponentRegistry: Record<string, ComponentType<any>> = {
  AnnouncementBar,
  ImageHero,
  ImageWithText,
  PromotionBanner,
  MultiColumn,
  RichText,
  Testimonials,
  FeaturedCollectionGrid,
  FeaturedCollectionSlider,
  CollectionListGrid,
  CollectionListSlider,
  ProductImageGallery,
  FeaturedProduct,
  Header,
  Footer,
  Newsletter,
  CountdownBanner,
  Slideshow,
  ScrollableTextSection,

  // Backward compatibility mappings
  HeroBanner: ImageHero,
  CategoryRow: MultiColumn,
  CountdownTimer: CountdownBanner,
  FeaturedProducts: FeaturedCollectionGrid,
  ProductGrid: FeaturedCollectionGrid,
  CollectionGrid: CollectionListGrid,
};

export const SchemaRegistry: Record<string, z.ZodObject<any>> = {
  AnnouncementBar: AnnouncementBarSchema,
  ImageHero: ImageHeroSchema,
  ImageWithText: ImageWithTextSchema,
  PromotionBanner: PromotionBannerSchema,
  MultiColumn: MultiColumnSchema,
  RichText: RichTextSchema,
  Testimonials: TestimonialsSchema,
  FeaturedCollectionGrid: FeaturedCollectionGridSchema,
  FeaturedCollectionSlider: FeaturedCollectionSliderSchema,
  CollectionListGrid: CollectionListGridSchema,
  CollectionListSlider: CollectionListSliderSchema,
  ProductImageGallery: ProductImageGallerySchema,
  FeaturedProduct: FeaturedProductSchema,
  Header: HeaderSchema,
  Footer: FooterSchema,
  Newsletter: NewsletterSchema,
  CountdownBanner: CountdownBannerSchema,
  Slideshow: SlideshowSchema,
  ScrollableTextSection: ScrollableTextSectionSchema,
  // Backward compatibility mappings
  HeroBanner: ImageHeroSchema,
  CategoryRow: MultiColumnSchema,
  CountdownTimer: CountdownBannerSchema,
  FeaturedProducts: FeaturedCollectionGridSchema,
  ProductGrid: FeaturedCollectionGridSchema,
  CollectionGrid: CollectionListGridSchema,
};

export const BuilderRegistry: Record<string, BuilderMetadata> = {
  AnnouncementBar: AnnouncementBarBuilder,
  ImageHero: ImageHeroBuilder,
  ImageWithText: ImageWithTextBuilder,
  PromotionBanner: PromotionBannerBuilder,
  MultiColumn: MultiColumnBuilder,
  RichText: RichTextBuilder,
  Testimonials: TestimonialsBuilder,
  FeaturedCollectionGrid: FeaturedCollectionGridBuilder,
  FeaturedCollectionSlider: FeaturedCollectionSliderBuilder,
  CollectionListGrid: CollectionListGridBuilder,
  CollectionListSlider: CollectionListSliderBuilder,
  ProductImageGallery: ProductImageGalleryBuilder,
  FeaturedProduct: FeaturedProductBuilder,
  Header: HeaderBuilder,
  Footer: FooterBuilder,
  Newsletter: NewsletterBuilder,
  CountdownBanner: CountdownBannerBuilder,
  Slideshow: SlideshowBuilder,
  ScrollableTextSection: ScrollableTextSectionBuilder as any,

  // Backward compatibility mappings
  HeroBanner: ImageHeroBuilder,
  CategoryRow: MultiColumnBuilder,
  CountdownTimer: CountdownBannerBuilder,
  FeaturedProducts: FeaturedCollectionGridBuilder,
  ProductGrid: FeaturedCollectionGridBuilder,
  CollectionGrid: CollectionListGridBuilder,
};
