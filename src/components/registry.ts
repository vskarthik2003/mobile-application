import { type ComponentType } from "react";
import { type z } from "zod";

// Imports
import { AnnouncementBar, AnnouncementBarSchema, AnnouncementBarBuilder } from "./AnnouncementBar";
import { ImageHero, ImageHeroSchema, ImageHeroBuilder } from "./ImageHero";
import { ImageWithText, ImageWithTextSchema, ImageWithTextBuilder } from "./ImageWithText";
import { PromotionBanner, PromotionBannerSchema, PromotionBannerBuilder } from "./PromotionBanner";
import { MultiColumn, MultiColumnSchema, MultiColumnBuilder } from "./MultiColumn";
import { RichText, RichTextSchema, RichTextBuilder } from "./RichText";
import { Testimonials, TestimonialsSchema, TestimonialsBuilder } from "./Testimonials";

import { FeaturedCollectionGrid, FeaturedCollectionGridSchema, FeaturedCollectionGridBuilder } from "./FeaturedCollectionGrid";
import { FeaturedCollectionSlider, FeaturedCollectionSliderSchema, FeaturedCollectionSliderBuilder } from "./FeaturedCollectionSlider";
import { CollectionListGrid, CollectionListGridSchema, CollectionListGridBuilder } from "./CollectionListGrid";
import { CollectionListSlider, CollectionListSliderSchema, CollectionListSliderBuilder } from "./CollectionListSlider";

import { ProductImageGallery, ProductImageGallerySchema, ProductImageGalleryBuilder } from "./ProductImageGallery";
import { FeaturedProduct, FeaturedProductSchema, FeaturedProductBuilder } from "./FeaturedProduct";

import { Header, HeaderSchema, HeaderBuilder } from "./Header";
import { Footer, FooterSchema, FooterBuilder } from "./Footer";
import { Newsletter, NewsletterSchema, NewsletterBuilder } from "./Newsletter";

import { CountdownBanner, CountdownBannerSchema, CountdownBannerBuilder } from "./CountdownBanner";
import { Slideshow, SlideshowSchema, SlideshowBuilder } from "./Slideshow";

export interface BuilderField {
  name: string;
  label: string;
  type: "text" | "number" | "boolean" | "color" | "select" | "image" | "list" | "object";
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
  
  // Backward compatibility mappings
  HeroBanner: ImageHeroBuilder,
  CategoryRow: MultiColumnBuilder,
  CountdownTimer: CountdownBannerBuilder,
  FeaturedProducts: FeaturedCollectionGridBuilder,
  ProductGrid: FeaturedCollectionGridBuilder,
  CollectionGrid: CollectionListGridBuilder,
};
