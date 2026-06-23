export interface ShopifyImage {
  url: string;
  altText?: string;
}

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyMoney;
  compareAtPrice?: ShopifyMoney;
  selectedOptions: { name: string; value: string }[];
}

export interface ShopifyOption {
  name: string;
  values: string[];
}

export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: ShopifyMoney;
  };
  compareAtPriceRange?: {
    minVariantPrice: ShopifyMoney;
  };
  images: ShopifyImage[];
  variants: ShopifyVariant[];
  options: ShopifyOption[];
  vendor?: string;
}

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  description?: string;
  image?: ShopifyImage;
  products: ShopifyProduct[];
}

// Config variables
const SHOPIFY_DOMAIN = process.env.EXPO_PUBLIC_SHOPIFY_DOMAIN;
const STOREFRONT_ACCESS_TOKEN = process.env.EXPO_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const API_VERSION = "2024-01";

// Helper to make storefront API calls
async function storefrontQuery<T>(query: string, variables: Record<string, any> = {}): Promise<T> {
  if (!SHOPIFY_DOMAIN || !STOREFRONT_ACCESS_TOKEN) {
    throw new Error("Shopify credentials not configured");
  }

  const url = `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.statusText}`);
  }

  const json = await response.json();
  if (json.errors) {
    throw new Error(`GraphQL Errors: ${JSON.stringify(json.errors)}`);
  }

  return json.data;
}

// Extensive high-quality mock data matching the Shopify schema
const MOCK_PRODUCTS: ShopifyProduct[] = [
  {
    id: "prod-1",
    title: "Stiletto Silk Slip Dress",
    description: "Effortlessly elegant, the Stiletto Silk Slip Dress is crafted from 100% pure mulberry silk. Featuring a delicate cowl neck, adjustable spaghetti straps, and a flattering bias cut that drapes beautifully over the body. Ideal for evening events, styling with a blazer, or layering over a white tee for a premium casual look.",
    handle: "stiletto-silk-slip-dress",
    availableForSale: true,
    vendor: "Stiletto Studio",
    priceRange: {
      minVariantPrice: { amount: "12500.00", currencyCode: "INR" }
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: "18000.00", currencyCode: "INR" }
    },
    images: [
      { url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80", altText: "Stiletto Silk Slip Dress front view" },
      { url: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=800&q=80", altText: "Stiletto Silk Slip Dress detail" }
    ],
    options: [
      { name: "Size", values: ["XS", "S", "M", "L", "XL"] },
      { name: "Color", values: ["Champagne", "Midnight Black", "Emerald Green"] }
    ],
    variants: [
      {
        id: "var-1-1",
        title: "XS / Champagne",
        availableForSale: true,
        price: { amount: "12500.00", currencyCode: "INR" },
        compareAtPrice: { amount: "18000.00", currencyCode: "INR" },
        selectedOptions: [{ name: "Size", value: "XS" }, { name: "Color", value: "Champagne" }]
      },
      {
        id: "var-1-2",
        title: "S / Champagne",
        availableForSale: true,
        price: { amount: "12500.00", currencyCode: "INR" },
        compareAtPrice: { amount: "18000.00", currencyCode: "INR" },
        selectedOptions: [{ name: "Size", value: "S" }, { name: "Color", value: "Champagne" }]
      },
      {
        id: "var-1-3",
        title: "M / Champagne",
        availableForSale: true,
        price: { amount: "12500.00", currencyCode: "INR" },
        compareAtPrice: { amount: "18000.00", currencyCode: "INR" },
        selectedOptions: [{ name: "Size", value: "M" }, { name: "Color", value: "Champagne" }]
      },
      {
        id: "var-1-4",
        title: "L / Champagne",
        availableForSale: false,
        price: { amount: "12500.00", currencyCode: "INR" },
        compareAtPrice: { amount: "18000.00", currencyCode: "INR" },
        selectedOptions: [{ name: "Size", value: "L" }, { name: "Color", value: "Champagne" }]
      },
      {
        id: "var-1-5",
        title: "S / Midnight Black",
        availableForSale: true,
        price: { amount: "12500.00", currencyCode: "INR" },
        selectedOptions: [{ name: "Size", value: "S" }, { name: "Color", value: "Midnight Black" }]
      }
    ]
  },
  {
    id: "prod-2",
    title: "Classic Linen Utility Shirt",
    description: "A relaxed-fit utility shirt made from certified organic Belgian flax linen. Pre-washed for exceptional softness and styled with two chest utility pockets, button cuffs, and a classic collar. Light, breathable, and perfect for hot summer days.",
    handle: "classic-linen-utility-shirt",
    availableForSale: true,
    vendor: "Essential Goods",
    priceRange: {
      minVariantPrice: { amount: "4200.00", currencyCode: "INR" }
    },
    images: [
      { url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80", altText: "Classic Linen Utility Shirt" }
    ],
    options: [
      { name: "Size", values: ["S", "M", "L", "XL"] },
      { name: "Color", values: ["Olive Green", "Soft Sand", "Navy Blue"] }
    ],
    variants: [
      {
        id: "var-2-1",
        title: "S / Olive Green",
        availableForSale: true,
        price: { amount: "4200.00", currencyCode: "INR" },
        selectedOptions: [{ name: "Size", value: "S" }, { name: "Color", value: "Olive Green" }]
      },
      {
        id: "var-2-2",
        title: "M / Olive Green",
        availableForSale: true,
        price: { amount: "4200.00", currencyCode: "INR" },
        selectedOptions: [{ name: "Size", value: "M" }, { name: "Color", value: "Olive Green" }]
      },
      {
        id: "var-2-3",
        title: "L / Olive Green",
        availableForSale: true,
        price: { amount: "4200.00", currencyCode: "INR" },
        selectedOptions: [{ name: "Size", value: "L" }, { name: "Color", value: "Olive Green" }]
      }
    ]
  },
  {
    id: "prod-3",
    title: "Metro Leather Chelsea Boots",
    description: "Handcrafted in Portugal, the Metro Chelsea Boots feature a premium full-grain Italian calfskin upper, a durable stacked leather sole with rubber grip overlays, and elastic side panels for easy entry. Classic style reimagined for modern commuters.",
    handle: "metro-leather-chelsea-boots",
    availableForSale: true,
    vendor: "Walkwear Co.",
    priceRange: {
      minVariantPrice: { amount: "14500.00", currencyCode: "INR" }
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: "22000.00", currencyCode: "INR" }
    },
    images: [
      { url: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80", altText: "Metro Leather Chelsea Boots" }
    ],
    options: [
      { name: "Size", values: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"] },
      { name: "Color", values: ["Tan Brown", "Obsidian Black"] }
    ],
    variants: [
      {
        id: "var-3-1",
        title: "UK 8 / Tan Brown",
        availableForSale: true,
        price: { amount: "14500.00", currencyCode: "INR" },
        compareAtPrice: { amount: "22000.00", currencyCode: "INR" },
        selectedOptions: [{ name: "Size", value: "UK 8" }, { name: "Color", value: "Tan Brown" }]
      },
      {
        id: "var-3-2",
        title: "UK 9 / Tan Brown",
        availableForSale: true,
        price: { amount: "14500.00", currencyCode: "INR" },
        compareAtPrice: { amount: "22000.00", currencyCode: "INR" },
        selectedOptions: [{ name: "Size", value: "UK 9" }, { name: "Color", value: "Tan Brown" }]
      }
    ]
  },
  {
    id: "prod-4",
    title: "Oversized Raw Denim Jacket",
    description: "Cut from heavy 14oz Japanese selvedge denim. This jacket is unwashed and raw, designed to break in and develop custom creases and fades unique to your lifestyle. Designed with an oversized drop-shoulder silhouette.",
    handle: "oversized-raw-denim-jacket",
    availableForSale: true,
    vendor: "Essential Goods",
    priceRange: {
      minVariantPrice: { amount: "8900.00", currencyCode: "INR" }
    },
    images: [
      { url: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80", altText: "Oversized Raw Denim Jacket" }
    ],
    options: [
      { name: "Size", values: ["S", "M", "L"] }
    ],
    variants: [
      {
        id: "var-4-1",
        title: "S",
        availableForSale: true,
        price: { amount: "8900.00", currencyCode: "INR" },
        selectedOptions: [{ name: "Size", value: "S" }]
      },
      {
        id: "var-4-2",
        title: "M",
        availableForSale: true,
        price: { amount: "8900.00", currencyCode: "INR" },
        selectedOptions: [{ name: "Size", value: "M" }]
      }
    ]
  },
  {
    id: "prod-5",
    title: "Polarized Tortoise Sunglasses",
    description: "Classic hand-polished acetate sunglasses in a timeless tortoise shell pattern. Outfitted with Category 3 CR-39 polarized lenses offering 100% UVA/UVB protection and anti-scratch coatings.",
    handle: "polarized-tortoise-sunglasses",
    availableForSale: true,
    vendor: "Stiletto Studio",
    priceRange: {
      minVariantPrice: { amount: "2900.00", currencyCode: "INR" }
    },
    images: [
      { url: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80", altText: "Polarized Tortoise Sunglasses" }
    ],
    options: [
      { name: "Color", values: ["Tortoise Shell", "Matte Black"] }
    ],
    variants: [
      {
        id: "var-5-1",
        title: "Tortoise Shell",
        availableForSale: true,
        price: { amount: "2900.00", currencyCode: "INR" },
        selectedOptions: [{ name: "Color", value: "Tortoise Shell" }]
      }
    ]
  },
  {
    id: "prod-6",
    title: "Minimalist Gold Hoop Earrings",
    description: "Dainty everyday thick hoops crafted in 18k gold vermeil over sterling silver. Extremely lightweight, waterproof, hypoallergenic, and finished with secure click-on hinges.",
    handle: "minimalist-gold-hoop-earrings",
    availableForSale: true,
    vendor: "Walkwear Co.",
    priceRange: {
      minVariantPrice: { amount: "3500.00", currencyCode: "INR" }
    },
    images: [
      { url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80", altText: "Minimalist Gold Hoop Earrings" }
    ],
    options: [
      { name: "Material", values: ["18k Gold", "925 Silver"] }
    ],
    variants: [
      {
        id: "var-6-1",
        title: "18k Gold",
        availableForSale: true,
        price: { amount: "3500.00", currencyCode: "INR" },
        selectedOptions: [{ name: "Material", value: "18k Gold" }]
      }
    ]
  }
];

const MOCK_COLLECTIONS: ShopifyCollection[] = [
  {
    id: "c-1",
    title: "Summer Essentials",
    handle: "summer-essentials",
    description: "Lightweight fabrics, sun-drenched styles, and seasonal accessories.",
    image: { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", altText: "Summer Essentials Collection Banner" },
    products: [MOCK_PRODUCTS[0], MOCK_PRODUCTS[1], MOCK_PRODUCTS[4]]
  },
  {
    id: "c-2",
    title: "New Arrivals",
    handle: "new-arrivals",
    description: "Be the first to shop the latest silhouettes and trendsetting drops.",
    image: { url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80", altText: "New Arrivals Collection Banner" },
    products: [MOCK_PRODUCTS[1], MOCK_PRODUCTS[3], MOCK_PRODUCTS[5]]
  },
  {
    id: "c-3",
    title: "Best Sellers",
    handle: "best-sellers",
    description: "Highly rated, customer-favorite staples back in stock.",
    image: { url: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=800&q=80", altText: "Best Sellers Collection Banner" },
    products: [MOCK_PRODUCTS[0], MOCK_PRODUCTS[2], MOCK_PRODUCTS[4], MOCK_PRODUCTS[5]]
  }
];

// Service Methods
export async function getProduct(id: string): Promise<ShopifyProduct> {
  // If credentials are setup, make real Storefront API request
  if (SHOPIFY_DOMAIN && STOREFRONT_ACCESS_TOKEN) {
    try {
      const query = `
        query getProduct($id: ID!) {
          product(id: $id) {
            id
            title
            description
            handle
            availableForSale
            vendor
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            options {
              name
              values
            }
            variants(first: 50) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
          }
        }
      `;
      const data = await storefrontQuery<{ product: any }>(query, { id });
      if (data && data.product) {
        // Map edges to standard flat array
        const p = data.product;
        return {
          id: p.id,
          title: p.title,
          description: p.description,
          handle: p.handle,
          availableForSale: p.availableForSale,
          vendor: p.vendor,
          priceRange: p.priceRange,
          compareAtPriceRange: p.compareAtPriceRange,
          images: p.images.edges.map((e: any) => e.node),
          options: p.options,
          variants: p.variants.edges.map((e: any) => e.node),
        };
      }
    } catch (e) {
      console.warn("GraphQL error, falling back to mock", e);
    }
  }

  // Fallback to local mocks
  const found = MOCK_PRODUCTS.find((p) => p.id === id || p.handle === id);
  if (!found) {
    // If not found, return the first mock product
    return MOCK_PRODUCTS[0];
  }
  return found;
}

export async function getCollection(id: string): Promise<ShopifyCollection> {
  if (SHOPIFY_DOMAIN && STOREFRONT_ACCESS_TOKEN) {
    try {
      const query = `
        query getCollection($id: ID!) {
          collection(id: $id) {
            id
            title
            handle
            description
            image {
              url
              altText
            }
            products(first: 20) {
              edges {
                node {
                  id
                  title
                  description
                  handle
                  availableForSale
                  vendor
                  priceRange {
                    minVariantPrice {
                      amount
                      currencyCode
                    }
                  }
                  compareAtPriceRange {
                    minVariantPrice {
                      amount
                      currencyCode
                    }
                  }
                  images(first: 5) {
                    edges {
                      node {
                        url
                        altText
                      }
                    }
                  }
                  options {
                    name
                    values
                  }
                  variants(first: 50) {
                    edges {
                      node {
                        id
                        title
                        availableForSale
                        price {
                          amount
                          currencyCode
                        }
                        compareAtPrice {
                          amount
                          currencyCode
                        }
                        selectedOptions {
                          name
                          value
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;
      const data = await storefrontQuery<{ collection: any }>(query, { id });
      if (data && data.collection) {
        const c = data.collection;
        return {
          id: c.id,
          title: c.title,
          handle: c.handle,
          description: c.description,
          image: c.image ? { url: c.image.url, altText: c.image.altText } : undefined,
          products: c.products.edges.map((e: any) => {
            const p = e.node;
            return {
              id: p.id,
              title: p.title,
              description: p.description,
              handle: p.handle,
              availableForSale: p.availableForSale,
              vendor: p.vendor,
              priceRange: p.priceRange,
              compareAtPriceRange: p.compareAtPriceRange,
              images: p.images.edges.map((img: any) => img.node),
              options: p.options,
              variants: p.variants.edges.map((v: any) => v.node),
            };
          }),
        };
      }
    } catch (e) {
      console.warn("GraphQL error, falling back to mock", e);
    }
  }

  const found = MOCK_COLLECTIONS.find((c) => c.id === id || c.handle === id);
  if (!found) {
    return MOCK_COLLECTIONS[0];
  }
  return found;
}

export async function getCollections(ids?: string[]): Promise<ShopifyCollection[]> {
  if (SHOPIFY_DOMAIN && STOREFRONT_ACCESS_TOKEN) {
    try {
      const query = `
        query getCollections {
          collections(first: 20) {
            edges {
              node {
                id
                title
                handle
                description
                image {
                  url
                  altText
                }
              }
            }
          }
        }
      `;
      const data = await storefrontQuery<{ collections: any }>(query);
      if (data && data.collections) {
        const results: ShopifyCollection[] = data.collections.edges.map((e: any) => {
          const c = e.node;
          return {
            id: c.id,
            title: c.title,
            handle: c.handle,
            description: c.description,
            image: c.image ? { url: c.image.url, altText: c.image.altText } : undefined,
            products: [], // We skip preloading products to keep collection lists small
          };
        });

        if (ids && ids.length > 0) {
          return results.filter((r) => ids.includes(r.id) || ids.includes(r.handle));
        }
        return results;
      }
    } catch (e) {
      console.warn("GraphQL error, falling back to mock", e);
    }
  }

  if (ids && ids.length > 0) {
    return MOCK_COLLECTIONS.filter((c) => ids.includes(c.id) || ids.includes(c.handle));
  }
  return MOCK_COLLECTIONS;
}
