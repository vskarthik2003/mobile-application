import type { AppConfig } from "@/src/schema/app-config";

export const mockAppConfig: AppConfig = {
  schemaVersion: "1.0.0",
  revision: 2,

  // ─── Navigation ─────────────────────────────────────────────────────────────
  navigation: [
    { id: "home",        title: "Home",        icon: "home-outline",    visible: true,  order: 0 },
    { id: "collections", title: "Collections", icon: "grid-outline",    visible: true,  order: 1 },
    { id: "favorites",   title: "Favorites",   icon: "heart-outline",   visible: true,  order: 2 },
    { id: "cart",        title: "Cart",        icon: "cart-outline",    visible: true,  order: 3 },
    { id: "profile",     title: "Profile",     icon: "person-outline",  visible: true,  order: 4 },
  ],

  // ─── Pages ──────────────────────────────────────────────────────────────────
  pages: [
    // HOME
    {
      id: "home",
      title: "Home",
      sections: [
        {
          id: "home-header",
          type: "Header",
          props: { showSearch: true, showCart: true, showMenu: true },
        },
        {
          id: "home-hero",
          type: "Slideshow",
          props: {
            autoPlay: true,
            interval: 4000,
            slides: [
              {
                id: "slide-1",
                imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
                title: "Summer Drop 2026",
                subtitle: "New silhouettes, sun-soaked styles",
                ctaLabel: "Shop Now",
                ctaHandle: "summer-essentials",
              },
              {
                id: "slide-2",
                imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80",
                title: "New Arrivals",
                subtitle: "Be the first to wear it",
                ctaLabel: "Explore",
                ctaHandle: "new-arrivals",
              },
            ],
          },
        },
        {
          id: "home-announcement",
          type: "AnnouncementBar",
          props: {
            messages: ["✨ Free shipping on orders above ₹999", "🎁 New collection just dropped", "💳 Easy returns within 14 days"],
            bgColor: "#FAF7C3",
            textColor: "#242526",
            autoPlay: true,
            timeGap: 3,
          },
        },
        {
          id: "home-collection-slider",
          type: "FeaturedCollectionSlider",
          props: {
            title: "Shop by Collection",
            subtitle: "Curated just for you",
            collectionHandles: ["summer-essentials", "new-arrivals", "best-sellers"],
            showCTA: true,
          },
        },
        {
          id: "home-countdown",
          type: "CountdownBanner",
          props: {
            title: "Flash Sale — Ends In",
            endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(),
            bgColor: "#111827",
            textColor: "#ffffff",
          },
        },
        {
          id: "home-featured-products",
          type: "FeaturedCollectionGrid",
          props: {
            title: "Best Sellers",
            subtitle: "Customer favourites, back in stock",
            collectionHandle: "best-sellers",
            columns: 2,
            showCTA: true,
            ctaLabel: "View All",
          },
        },
        {
          id: "home-promo",
          type: "PromotionBanner",
          props: {
            title: "Up to 40% Off",
            subtitle: "On selected styles this weekend",
            imageUrl: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80",
            ctaLabel: "Shop Deals",
            ctaHandle: "best-sellers",
            overlayOpacity: 0.45,
          },
        },
        {
          id: "home-testimonials",
          type: "Testimonials",
          props: {
            title: "What our customers say",
            testimonials: [
              { id: "t1", author: "Priya M.", rating: 5, text: "Absolutely love the quality. Will buy again!" },
              { id: "t2", author: "Ravi S.", rating: 5, text: "Fast delivery and beautiful packaging." },
              { id: "t3", author: "Ananya K.", rating: 4, text: "Great selection, very stylish pieces." },
            ],
          },
        },
        {
          id: "home-newsletter",
          type: "Newsletter",
          props: {
            title: "Stay in the Loop",
            subtitle: "Get early access to new drops & exclusive offers.",
            placeholder: "Your email address",
            ctaLabel: "Subscribe",
          },
        },
        {
          id: "home-footer",
          type: "Footer",
          props: {
            links: [
              { label: "About Us", url: "/about" },
              { label: "FAQs", url: "/faq" },
              { label: "Returns", url: "/returns" },
              { label: "Privacy Policy", url: "/privacy" },
            ],
            copyright: "© 2026 Stiletto Studio",
          },
        },
      ],
    },

    // COLLECTIONS LIST
    {
      id: "collections",
      title: "Collections",
      sections: [
        {
          id: "col-header",
          type: "Header",
          props: { showSearch: true, showCart: true, showMenu: false },
        },
        {
          id: "col-image-hero",
          type: "ImageHero",
          props: {
            title: "Our Collections",
            subtitle: "Discover curated styles for every season",
            imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80",
            height: 240,
            overlayOpacity: 0.4,
            ctaLabel: "See All",
          },
        },
        {
          id: "col-grid",
          type: "CollectionListGrid",
          props: {
            title: "All Collections",
            columns: 2,
            collectionHandles: ["summer-essentials", "new-arrivals", "best-sellers"],
          },
        },
      ],
    },

    // FAVORITES (content overridden in the screen component — wishlist-driven)
    {
      id: "favorites",
      title: "Favorites",
      sections: [
        {
          id: "fav-header",
          type: "Header",
          props: { showSearch: false, showCart: true, showMenu: false },
        },
      ],
    },

    // CART (content overridden in the screen component — cart-driven)
    {
      id: "cart",
      title: "Cart",
      sections: [
        {
          id: "cart-header",
          type: "Header",
          props: { showSearch: false, showCart: false, showMenu: false },
        },
      ],
    },

    // PROFILE
    {
      id: "profile",
      title: "Profile",
      sections: [
        {
          id: "profile-header",
          type: "Header",
          props: { showSearch: false, showCart: true, showMenu: true },
        },
      ],
    },
  ],

  // ─── Collection Landing Pages (custom per handle) ────────────────────────
  collectionPages: {
    default: [
      {
        id: "col-lp-hero",
        type: "ImageHero",
        props: {
          title: "{{collection.title}}",
          subtitle: "{{collection.description}}",
          imageUrl: "{{collection.image.url}}",
          overlayOpacity: 0.35,
          height: 280,
        },
      },
      {
        id: "col-lp-promo",
        type: "PromotionBanner",
        props: {
          title: "Free Shipping",
          subtitle: "On all orders within this collection",
          bgColor: "#FAF7C3",
          textColor: "#242526",
        },
      },
    ],
  },

  // ─── Product Detail Page ─────────────────────────────────────────────────
  productPage: [
    { id: "pdp-gallery",   type: "ProductImageGallery", props: {} },
    { id: "pdp-featured",  type: "FeaturedProduct",     props: { showVariantPicker: true, showQuantitySelector: true, showBuyNow: true, showDescription: true } },
    { id: "pdp-countdown", type: "CountdownBanner",     props: { title: "Limited Time Offer", endDate: new Date(Date.now() + 1000 * 60 * 60 * 8).toISOString() } },
    { id: "pdp-testi",     type: "Testimonials",        props: { title: "What customers say" } },
  ],

  // ─── Theme ──────────────────────────────────────────────────────────────────
  theme: {
    colors: {
      primary: "#E11D48",
      background: "#FFFFFF",
      surface: "#F9FAFB",
      text: "#111827",
      textMuted: "#6B7280",
      border: "#E5E7EB",
    },
    radius: { sm: 4, md: 8, lg: 16 },
    announcementBar: {
      textColor: "#242526",
      bgColor: "#FAF7C3",
      timeGap: 4,
      autoPlay: true,
      messages: ["✨ Free shipping on orders above ₹999", "🎉 Summer Sale is Live!"],
    },
    scrollableTextSec: {
      bgColor: "#242526",
      textColor: "#FAF7C3",
      duration: 10,
      direction: "ltr",
    },
  },

  // ─── Branding ───────────────────────────────────────────────────────────────
  branding: {
    appName: "Stiletto Studio",
    logoUrl: "https://zuperapps.com/cdn/shop/files/Frame_2121452720.svg?v=1754553838&width=340",
  },

  // ─── Settings ───────────────────────────────────────────────────────────────
  settings: {
    locale: "en-IN",
    currency: "INR",
    previewMode: true,
  },
};
