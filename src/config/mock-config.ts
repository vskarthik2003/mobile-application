import type { AppConfig } from "@/src/schema/app-config";

export const mockAppConfig: AppConfig = {
  schemaVersion: "1.0.0",
  revision: 1,
  navigation: [
    { id: "home", title: "Home", icon: "home-outline", visible: true },
    {
      id: "collections",
      title: "Collections",
      icon: "grid-outline",
      visible: true,
    },
    { id: "profile", title: "Profile", icon: "person-outline", visible: true },
    { id: "cart", title: "Cart", icon: "cart-outline", visible: true },
    { id: "heart", title: "Favorites", icon: "heart-outline", visible: true },
  ],
  pages: [
    {
      id: "home",
      title: "Home",
      sections: [
        {
          id: "home-header",
          type: "Header",
          props: {
            showSearch: true,
            showCart: true,
            showMenu: true,
          },
        },
        {
          id: "home-hero",
          type: "HeroBanner",
          props: {
            title: "Sales start soon",
            subtitle: "Up to 50% off selected styles",
            imageUrl:
              "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
            ctaLabel: "Shop Now",
          },
        },
        {
          id: "home-scrolltext",
          type: "ScrollableTextSection",
          props: {
            bgColor: "#242526",
            textColor: "#FAF7C3",
            duration: 10,
            direction: "ltr",
          },
        },
        {
          id: "home-categories",
          type: "CategoryRow",
          props: {
            title: "Shop by Category",
            categories: [
              { id: "1", label: "Men", color: "#EF4444" },
              { id: "2", label: "Women", color: "#3B82F6" },
              { id: "3", label: "Kids", color: "#22C55E" },
              { id: "4", label: "Accessories", color: "#EAB308" },
            ],
          },
        },
        {
          id: "home-countdown",
          type: "CountdownTimer",
          props: {
            title: "Flash Sale Ends In",
            endDate: new Date(
              Date.now() + 1000 * 60 * 60 * 24 * 2,
            ).toISOString(),
          },
        },
        {
          id: "home-featured",
          type: "FeaturedProducts",
          props: {
            title: "Top Products",
            products: [
              { id: "1", name: "Shirt", price: "₹1000", color: "#DC2626" },
              { id: "2", name: "Pant", price: "₹1500", color: "#2563EB" },
              { id: "3", name: "T-shirt", price: "₹1300", color: "#16A34A" },
              { id: "4", name: "Coat", price: "₹10000", color: "#9333EA" },
            ],
          },
        },
        {
          id: "home-grid",
          type: "ProductGrid",
          props: {
            title: "New Arrivals",
            columns: 2,
            products: [
              { id: "5", name: "Sneakers", price: "₹3200", color: "#F97316" },
              { id: "6", name: "Backpack", price: "₹2100", color: "#0EA5E9" },
              { id: "7", name: "Watch", price: "₹8900", color: "#64748B" },
              { id: "8", name: "Sunglasses", price: "₹1800", color: "#EC4899" },
            ],
          },
        },
      ],
    },
    {
      id: "collections",
      title: "Collections",
      sections: [
        {
          id: "collections-header",
          type: "Header",
          props: {
            showSearch: true,
            showCart: true,
            showMenu: true,
          },
        },
        {
          id: "collections-grid",
          type: "CollectionGrid",
          props: {
            title: "All Collections",
            collections: [
              {
                id: "c1",
                name: "Summer Sale",
                itemCount: 48,
                color: "#FB7185",
              },
              {
                id: "c2",
                name: "New In",
                itemCount: 32,
                color: "#60A5FA",
              },
              {
                id: "c3",
                name: "Best Sellers",
                itemCount: 24,
                color: "#4ADE80",
              },
              {
                id: "c4",
                name: "Limited Edition",
                itemCount: 12,
                color: "#FACC15",
              },
            ],
          },
        },
      ],
    },
    {
      id: "profile",
      title: "Profile",
      sections: [
        {
          id: "profile-header",
          type: "Header",
          props: {
            showSearch: false,
            showCart: true,
            showMenu: true,
          },
        },
        {
          id: "profile-user",
          type: "UserProfile",
          props: {
            name: "Jane Merchant",
            email: "jane@store.com",
            memberSince: "2024",
          },
        },
        {
          id: "profile-orders",
          type: "Orders",
          props: {
            title: "Recent Orders",
            orders: [
              {
                id: "ORD-1001",
                status: "Delivered",
                total: "₹4,500",
                date: "Jun 12, 2026",
              },
              {
                id: "ORD-1002",
                status: "Shipped",
                total: "₹2,200",
                date: "Jun 15, 2026",
              },
              {
                id: "ORD-1003",
                status: "Processing",
                total: "₹8,900",
                date: "Jun 18, 2026",
              },
            ],
          },
        },
      ],
    },
    {
      id: "cart",
      title: "Cart",
      sections: [
        {
          id: "cart-header",
          type: "Header",
          props: {
            showSearch: false,
            showCart: true,
            showMenu: true,
          },
        },
      ],
    },
    {
      id: "heart",
      title: "Favorites",
      sections: [
        {
          id: "heart-header",
          type: "Header",
          props: {
            showSearch: false,
            showCart: true,
            showMenu: true,
          },
        },
      ],
    },
  ],
  theme: {
    colors: {
      primary: "#E11D48",
      background: "#FFFFFF",
      surface: "#F9FAFB",
      text: "#111827",
      textMuted: "#6B7280",
      border: "#E5E7EB",
    },
    radius: {
      sm: 4,
      md: 8,
      lg: 16,
    },
    announcementBar: {
      textColor: "#242526",
      bgColor: "#FAF7C3",
      timeGap: 4,
      autoPlay: true,
      messages: ["Hello", "karthik@", "Big Sale Today", "Free Shipping"],
    },
  },
  branding: {
    appName: "Zuper Store",
    logoUrl:
      "https://zuperapps.com/cdn/shop/files/Frame_2121452720.svg?v=1754553838&width=340",
  },
  settings: {
    locale: "en-US",
    currency: "USD",
    previewMode: true,
  },
};
