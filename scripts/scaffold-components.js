const fs = require("fs");
const path = require("path");

const componentsDir = path.join(__dirname, "../src/components");

const components = [
  // 1. Static Content
  {
    name: "AnnouncementBar",
    category: "static",
    props: [
      { name: "messages", type: "array", valueType: "string", defaultValue: '["Hello", "Welcome", "Big Sale Today", "Free Shipping"]' },
      { name: "bgColor", type: "string", defaultValue: '"#FAF7C3"' },
      { name: "textColor", type: "string", defaultValue: '"#242526"' },
      { name: "autoPlay", type: "boolean", defaultValue: "true" },
      { name: "timeGap", type: "number", defaultValue: "3" }
    ]
  },
  {
    name: "ImageHero",
    category: "static",
    props: [
      { name: "imageUrl", type: "string", defaultValue: '"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"' },
      { name: "title", type: "string", defaultValue: '"Elevate Your Style"' },
      { name: "subtitle", type: "string", defaultValue: '"Discover our new seasonal arrival collection."' },
      { name: "ctaLabel", type: "string", defaultValue: '"Shop Collection"' },
      { name: "ctaUrl", type: "string", defaultValue: '"/collections/new-in"' },
      { name: "height", type: "number", defaultValue: "300" },
      { name: "overlayOpacity", type: "number", defaultValue: "0.4" },
      { name: "alignment", type: "select", options: ["left", "center", "right"], defaultValue: '"center"' }
    ]
  },
  {
    name: "ImageWithText",
    category: "static",
    props: [
      { name: "imageUrl", type: "string", defaultValue: '"https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80"' },
      { name: "imagePosition", type: "select", options: ["left", "right"], defaultValue: '"left"' },
      { name: "title", type: "string", defaultValue: '"Handcrafted Elegance"' },
      { name: "text", type: "string", defaultValue: '"Each piece is crafted by local artisans using sustainable processes and premium organic fabrics. Designed to feel luxurious on your skin and last a lifetime."' },
      { name: "ctaLabel", type: "string", defaultValue: '"Our Process"' },
      { name: "ctaUrl", type: "string", defaultValue: '"/about"' },
      { name: "bgColor", type: "string", defaultValue: '""' }
    ]
  },
  {
    name: "PromotionBanner",
    category: "static",
    props: [
      { name: "title", type: "string", defaultValue: '"Special Launch Discount"' },
      { name: "description", type: "string", defaultValue: '"Enjoy flat 20% off all new collections."' },
      { name: "badgeText", type: "string", defaultValue: '"LIMITED TIME"' },
      { name: "discountCode", type: "string", defaultValue: '"STILETTO20"' },
      { name: "bgColor", type: "string", defaultValue: '"#F43F5E"' },
      { name: "textColor", type: "string", defaultValue: '"#FFFFFF"' },
      { name: "imageUrl", type: "string", defaultValue: '""' }
    ]
  },
  {
    name: "MultiColumn",
    category: "static",
    props: [
      { name: "title", type: "string", defaultValue: '"Why Choose Us"' },
      { name: "subtitle", type: "string", defaultValue: '"The Stiletto Promise"' },
      { name: "columnCount", type: "number", defaultValue: "3" },
      {
        name: "columns",
        type: "array",
        valueType: "object",
        defaultValue: `[
          { id: "1", title: "Free Shipping", text: "On all orders above ₹5000", icon: "airplane-outline" },
          { id: "2", title: "Easy Returns", text: "30-day hassle-free exchange policy", icon: "refresh-outline" },
          { id: "3", title: "Premium Quality", text: "Made with 100% certified organic fabrics", icon: "ribbon-outline" }
        ]`
      }
    ]
  },
  {
    name: "RichText",
    category: "static",
    props: [
      { name: "title", type: "string", defaultValue: '"About Our Brand"' },
      { name: "subtitle", type: "string", defaultValue: '"Modern Minimalism"' },
      { name: "content", type: "string", defaultValue: '"We believe in fashion that makes a statement without shouting. Our collections are designed with clean lines, neutral colors, and subtle accents that elevate your everyday silhouette."' },
      { name: "alignment", type: "select", options: ["left", "center", "right"], defaultValue: '"center"' },
      { name: "ctaLabel", type: "string", defaultValue: '""' },
      { name: "ctaUrl", type: "string", defaultValue: '""' }
    ]
  },
  {
    name: "Testimonials",
    category: "static",
    props: [
      { name: "title", type: "string", defaultValue: '"What Our Customers Say"' },
      { name: "subtitle", type: "string", defaultValue: '"Reviews"' },
      { name: "bgColor", type: "string", defaultValue: '""' },
      {
        name: "testimonials",
        type: "array",
        valueType: "object",
        defaultValue: `[
          { id: "1", author: "Aditi S.", title: "Verified Buyer", rating: 5, reviewText: "The Silk Slip Dress fits like a dream! The fabric is incredibly soft and looks so luxurious. Highly recommend!", avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&q=80" },
          { id: "2", author: "Rohan M.", title: "Stylist", rating: 5, reviewText: "Superb quality Chelsea boots. Extremely comfortable and the leather breaks in beautifully.", avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&q=80" }
        ]`
      }
    ]
  },
  // 2. Collections
  {
    name: "FeaturedCollectionGrid",
    category: "collection",
    props: [
      { name: "collectionId", type: "string", defaultValue: '"summer-essentials"' },
      { name: "title", type: "string", defaultValue: '"Trending Now"' },
      { name: "subtitle", type: "string", defaultValue: '"Featured Collection"' },
      { name: "limit", type: "number", defaultValue: "4" },
      { name: "columns", type: "number", defaultValue: "2" },
      { name: "showPrices", type: "boolean", defaultValue: "true" }
    ]
  },
  {
    name: "FeaturedCollectionSlider",
    category: "collection",
    props: [
      { name: "collectionId", type: "string", defaultValue: '"new-arrivals"' },
      { name: "title", type: "string", defaultValue: '"New Arrivals"' },
      { name: "subtitle", type: "string", defaultValue: '"Trending Styles"' },
      { name: "limit", type: "number", defaultValue: "6" },
      { name: "showPrices", type: "boolean", defaultValue: "true" }
    ]
  },
  {
    name: "CollectionListGrid",
    category: "collection",
    props: [
      { name: "collectionIds", type: "array", valueType: "string", defaultValue: '["summer-essentials", "new-arrivals", "best-sellers"]' },
      { name: "title", type: "string", defaultValue: '"Browse by Theme"' },
      { name: "subtitle", type: "string", defaultValue: '"Collections"' },
      { name: "columns", type: "number", defaultValue: "1" }
    ]
  },
  {
    name: "CollectionListSlider",
    category: "collection",
    props: [
      { name: "collectionIds", type: "array", valueType: "string", defaultValue: '["summer-essentials", "new-arrivals", "best-sellers"]' },
      { name: "title", type: "string", defaultValue: '"Curated Silhouettes"' },
      { name: "subtitle", type: "string", defaultValue: '"Themes"' }
    ]
  },
  // 3. Products
  {
    name: "ProductImageGallery",
    category: "product",
    props: [
      { name: "imageUrls", type: "array", valueType: "string", defaultValue: '["https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80", "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=800&q=80"]' },
      { name: "dotColor", type: "string", defaultValue: '"#E5E7EB"' },
      { name: "activeDotColor", type: "string", defaultValue: '"#E11D48"' }
    ]
  },
  {
    name: "FeaturedProduct",
    category: "product",
    props: [
      { name: "productId", type: "string", defaultValue: '"prod-1"' },
      { name: "showQuantitySelector", type: "boolean", defaultValue: "true" },
      { name: "showDescription", type: "boolean", defaultValue: "true" },
      { name: "showVariantPicker", type: "boolean", defaultValue: "true" },
      { name: "showBuyNow", type: "boolean", defaultValue: "true" }
    ]
  },
  // 4. Global
  {
    name: "Header",
    category: "global",
    props: [
      { name: "logoUrl", type: "string", defaultValue: '""' },
      { name: "showSearch", type: "boolean", defaultValue: "true" },
      { name: "showCart", type: "boolean", defaultValue: "true" },
      { name: "showMenu", type: "boolean", defaultValue: "true" },
      { name: "layout", type: "select", options: ["default", "center-logo"], defaultValue: '"default"' }
    ]
  },
  {
    name: "Footer",
    category: "global",
    props: [
      { name: "text", type: "string", defaultValue: '"Your destination for minimal premium wardrobe staples."' },
      { name: "showSocials", type: "boolean", defaultValue: "true" },
      { name: "copyrightText", type: "string", defaultValue: '"© 2026 Stiletto Inc. All rights reserved."' },
      { name: "paymentIcons", type: "array", valueType: "string", defaultValue: '["logo-visa", "logo-mastercard", "card-outline"]' }
    ]
  },
  {
    name: "Newsletter",
    category: "global",
    props: [
      { name: "title", type: "string", defaultValue: '"Subscribe to Newsletter"' },
      { name: "subtitle", type: "string", defaultValue: '"Stay Updated"' },
      { name: "placeholder", type: "string", defaultValue: '"Enter your email address"' },
      { name: "buttonText", type: "string", defaultValue: '"Join Now"' },
      { name: "successMessage", type: "string", defaultValue: '"Thank you for subscribing!"' },
      { name: "bgColor", type: "string", defaultValue: '""' }
    ]
  },
  // 5. Promotional
  {
    name: "CountdownBanner",
    category: "promotional",
    props: [
      { name: "title", type: "string", defaultValue: '"Flash Sale Ending Soon"' },
      { name: "subtitle", type: "string", defaultValue: '"Limited Stock"' },
      { name: "targetDate", type: "string", defaultValue: 'new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString()' },
      { name: "imageUrl", type: "string", defaultValue: '"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"' },
      { name: "bgColor", type: "string", defaultValue: '""' },
      { name: "textColor", type: "string", defaultValue: '""' },
      { name: "ctaLabel", type: "string", defaultValue: '"Shop the Sale"' },
      { name: "ctaUrl", type: "string", defaultValue: '"/collections/summer-sale"' }
    ]
  },
  {
    name: "Slideshow",
    category: "promotional",
    props: [
      { name: "autoPlay", type: "boolean", defaultValue: "true" },
      { name: "interval", type: "number", defaultValue: "5" },
      {
        name: "slides",
        type: "array",
        valueType: "object",
        defaultValue: `[
          { id: "1", imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80", title: "Autumn Collection", subtitle: "Pre-order now for 15% off", ctaLabel: "Pre-Order", ctaUrl: "/collections/autumn" },
          { id: "2", imageUrl: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80", title: "Minimal Linens", subtitle: "Breathable designs for clean living", ctaLabel: "Shop Linens", ctaUrl: "/collections/linens" }
        ]`
      }
    ]
  }
];

// Helper to determine TS types from spec types
function getTSType(prop) {
  if (prop.type === "string") return "string";
  if (prop.type === "number") return "number";
  if (prop.type === "boolean") return "boolean";
  if (prop.type === "select") return prop.options.map((o) => `"${o}"`).join(" | ");
  if (prop.type === "array") {
    if (prop.valueType === "string") return "string[]";
    if (prop.valueType === "object") return "any[]";
  }
  return "any";
}

// Helper to determine Zod schema from spec types
function getZodSchema(prop) {
  let zType = "z.any()";
  if (prop.type === "string") zType = "z.string()";
  if (prop.type === "number") zType = "z.number()";
  if (prop.type === "boolean") zType = "z.boolean()";
  if (prop.type === "select") {
    zType = `z.enum([${prop.options.map((o) => `"${o}"`).join(", ")}])`;
  }
  if (prop.type === "array") {
    if (prop.valueType === "string") zType = "z.array(z.string())";
    if (prop.valueType === "object") zType = "z.array(z.any())";
  }

  // Handle default value
  if (prop.defaultValue !== undefined) {
    zType += `.default(${prop.defaultValue})`;
  } else {
    zType += `.optional()`;
  }

  return zType;
}

// Helper to determine Builder field type from spec types
function getBuilderField(prop) {
  let bType = "text";
  if (prop.type === "number") bType = "number";
  if (prop.type === "boolean") bType = "boolean";
  if (prop.type === "select") bType = "select";
  if (prop.type === "array") bType = "list";

  let optionsStr = "";
  if (prop.type === "select") {
    optionsStr = `,\n      options: [${prop.options.map((o) => `{ label: "${o.charAt(0).toUpperCase() + o.slice(1)}", value: "${o}" }`).join(", ")}]`;
  }

  return `{
      name: "${prop.name}",
      label: "${prop.name.charAt(0).toUpperCase() + prop.name.slice(1).replace(/([A-Z])/g, ' $1')}",
      type: "${bType}",
      defaultValue: ${prop.defaultValue}${optionsStr}
    }`;
}

// Render component specific code based on name
function getComponentImpl(name) {
  switch (name) {
    case "AnnouncementBar":
      return `  const announcements = messages || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay || announcements.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, timeGap * 1000);

    return () => clearInterval(interval);
  }, [timeGap, autoPlay, announcements.length]);

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  if (announcements.length === 0) return null;

  return (
    <View
      style={{ backgroundColor: bgColor }}
      className="flex-row items-center justify-between px-4 py-2.5 w-full shadow-sm"
    >
      <TouchableOpacity onPress={goPrev} activeOpacity={0.7} className="p-1">
        <Ionicons name="chevron-back" size={16} color={textColor} />
      </TouchableOpacity>

      <Text
        className="flex-1 text-center text-xs font-semibold tracking-wide"
        style={{ color: textColor }}
      >
        {announcements[currentIndex]}
      </Text>

      <TouchableOpacity onPress={goNext} activeOpacity={0.7} className="p-1">
        <Ionicons name="chevron-forward" size={16} color={textColor} />
      </TouchableOpacity>
    </View>
  );`;

    case "ImageHero":
      return `  const { theme } = useTheme();
  const textAlignment = alignment === "center" ? "items-center text-center" : alignment === "right" ? "items-end text-right" : "items-start text-left";

  return (
    <SectionContainer sectionId={sectionId} paddingX="none" paddingY="none">
      <View style={{ height }} className="relative w-full overflow-hidden bg-gray-950">
        <Image
          source={{ uri: imageUrl }}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
        />
        {/* Dark Overlay */}
        <View
          style={{ backgroundColor: \`rgba(0, 0, 0, \${overlayOpacity})\` }}
          className="absolute inset-0 justify-center px-6"
        >
          <View className={\`gap-3 w-full \${textAlignment}\`}>
            {subtitle && (
              <Text className="text-white/90 text-xs font-bold uppercase tracking-widest">
                {subtitle}
              </Text>
            )}
            {title && (
              <Text className="text-white text-3xl font-extrabold tracking-tight leading-none mb-1">
                {title}
              </Text>
            )}
            {ctaLabel && (
              <TouchableOpacity
                style={{
                  backgroundColor: theme.colors.primary,
                  borderRadius: theme.radius.md,
                }}
                className="px-6 py-3 mt-2"
                activeOpacity={0.8}
              >
                <Text className="text-white font-semibold text-sm">{ctaLabel}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </SectionContainer>
  );`;

    case "ImageWithText":
      return `  const { theme } = useTheme();
  const isImageLeft = imagePosition === "left";

  const cardBg = bgColor || theme.colors.surface;

  return (
    <SectionContainer sectionId={sectionId} paddingY="medium" paddingX="medium">
      <View
        style={{
          backgroundColor: cardBg,
          borderRadius: theme.radius.lg,
          borderWidth: 1,
          borderColor: theme.colors.border,
        }}
        className={\`overflow-hidden flex-col \${isImageLeft ? "" : "flex-col-reverse"}\`}
      >
        {/* Image portion */}
        <View className="w-full aspect-[4/3] bg-gray-50">
          <Image
            source={{ uri: imageUrl }}
            style={{ width: "100%", height: "100%" }}
            contentFit="cover"
          />
        </View>

        {/* Text portion */}
        <View className="p-6 gap-3">
          {title && (
            <Text className="text-xl font-bold tracking-tight" style={{ color: theme.colors.text }}>
              {title}
            </Text>
          )}
          {text && (
            <Text className="text-sm font-medium leading-relaxed" style={{ color: theme.colors.textMuted }}>
              {text}
            </Text>
          )}
          {ctaLabel && (
            <TouchableOpacity
              style={{
                backgroundColor: theme.colors.primary,
                borderRadius: theme.radius.md,
              }}
              className="px-5 py-2.5 mt-2 self-start"
              activeOpacity={0.8}
            >
              <Text className="text-white font-semibold text-xs">{ctaLabel}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SectionContainer>
  );`;

    case "PromotionBanner":
      return `  const { theme } = useTheme();

  return (
    <SectionContainer sectionId={sectionId} paddingY="medium" paddingX="medium">
      <View
        style={{
          backgroundColor: bgColor,
          borderRadius: theme.radius.lg,
        }}
        className="w-full relative overflow-hidden flex-row p-6 items-center justify-between"
      >
        <View className="flex-1 gap-2.5 z-10">
          {badgeText && (
            <View className="bg-white/20 self-start px-2 py-0.5 rounded">
              <Text className="text-[10px] font-bold tracking-wider" style={{ color: textColor }}>
                {badgeText}
              </Text>
            </View>
          )}
          {title && (
            <Text className="text-2xl font-black tracking-tight" style={{ color: textColor }}>
              {title}
            </Text>
          )}
          {description && (
            <Text className="text-xs font-semibold opacity-90 leading-normal" style={{ color: textColor }}>
              {description}
            </Text>
          )}

          {discountCode && (
            <View className="flex-row items-center gap-2 mt-2 bg-black/15 self-start px-3 py-1.5 rounded-lg border border-white/20">
              <Text className="text-xs font-bold tracking-widest font-mono" style={{ color: textColor }}>
                {discountCode}
              </Text>
              <TouchableOpacity activeOpacity={0.6}>
                <Ionicons name="copy-outline" size={14} color={textColor} />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {imageUrl ? (
          <View className="w-24 h-24 rounded-lg overflow-hidden ml-4">
            <Image source={{ uri: imageUrl }} style={{ width: "100%", height: "100%" }} contentFit="cover" />
          </View>
        ) : null}
      </View>
    </SectionContainer>
  );`;

    case "MultiColumn":
      return `  const { theme } = useTheme();

  const getColIcon = (iconName) => {
    return iconName || "checkmark-circle-outline";
  };

  const cols = columns || [];

  return (
    <SectionContainer sectionId={sectionId} paddingY="medium" paddingX="medium">
      {title && (
        <SectionHeading title={title} subtitle={subtitle} alignment="center" />
      )}
      <View className="flex-row flex-wrap gap-4 justify-between mt-1">
        {cols.map((col, idx) => (
          <View
            key={col.id || idx}
            style={{
              width: columnCount === 3 ? "30%" : columnCount === 2 ? "47%" : "100%",
              backgroundColor: theme.colors.surface,
              borderRadius: theme.radius.md,
              borderWidth: 1,
              borderColor: theme.colors.border,
            }}
            className="p-4 items-center text-center gap-2"
          >
            <View
              className="w-10 h-10 items-center justify-center rounded-full bg-rose-50"
            >
              <Ionicons name={getColIcon(col.icon)} size={20} color={theme.colors.primary} />
            </View>
            <Text className="text-xs font-bold text-center mt-1" style={{ color: theme.colors.text }}>
              {col.title}
            </Text>
            {col.text && (
              <Text className="text-[10px] text-center font-medium leading-normal" style={{ color: theme.colors.textMuted }}>
                {col.text}
              </Text>
            )}
            {col.ctaLabel && (
              <Text className="text-[10px] font-bold text-center mt-1" style={{ color: theme.colors.primary }}>
                {col.ctaLabel}
              </Text>
            )}
          </View>
        ))}
      </View>
    </SectionContainer>
  );`;

    case "RichText":
      return `  const { theme } = useTheme();
  const alignClass = alignment === "center" ? "items-center text-center" : alignment === "right" ? "items-end text-right" : "items-start text-left";

  return (
    <SectionContainer sectionId={sectionId} paddingY="medium" paddingX="medium">
      <View className={\`gap-3 px-2 \${alignClass}\`}>
        {subtitle && (
          <Text className="text-xs uppercase tracking-widest font-bold" style={{ color: theme.colors.primary }}>
            {subtitle}
          </Text>
        )}
        {title && (
          <Text className="text-2xl font-extrabold tracking-tight" style={{ color: theme.colors.text }}>
            {title}
          </Text>
        )}
        {content && (
          <Text className="text-sm font-medium leading-relaxed mt-1" style={{ color: theme.colors.textMuted }}>
            {content}
          </Text>
        )}
        {ctaLabel && ctaUrl && (
          <SectionCTA label={ctaLabel} variant="outline" size="small" style={{ marginTop: 8 }} />
        )}
      </View>
    </SectionContainer>
  );`;

    case "Testimonials":
      return `  const { theme } = useTheme();
  const reviews = testimonials || [];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (reviews.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  if (reviews.length === 0) return null;
  const current = reviews[activeIndex];

  return (
    <SectionContainer sectionId={sectionId} bgColor={bgColor} paddingY="large" paddingX="medium">
      {title && <SectionHeading title={title} subtitle={subtitle} alignment="center" />}
      <View
        className="w-full p-6 items-center border border-gray-100 rounded-2xl bg-white shadow-sm gap-3 mt-1"
        style={{ borderRadius: theme.radius.lg }}
      >
        <Ionicons name="chatbubble-ellipses" size={32} color={theme.colors.primary} className="opacity-70" />
        
        {/* Rating Stars */}
        <View className="flex-row gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Ionicons
              key={i}
              name={i < current.rating ? "star" : "star-outline"}
              size={14}
              color="#F59E0B"
            />
          ))}
        </View>

        <Text className="text-sm italic text-center font-medium leading-relaxed" style={{ color: theme.colors.text }}>
          "{current.reviewText}"
        </Text>

        <View className="flex-row items-center gap-3 mt-3">
          {current.avatarUrl && (
            <Image
              source={{ uri: current.avatarUrl }}
              style={{ width: 36, height: 36, borderRadius: 18 }}
              contentFit="cover"
            />
          )}
          <View>
            <Text className="text-xs font-bold" style={{ color: theme.colors.text }}>
              {current.author}
            </Text>
            {current.title && (
              <Text className="text-[10px] font-semibold" style={{ color: theme.colors.textMuted }}>
                {current.title}
              </Text>
            )}
          </View>
        </View>

        {/* Carousel Dots */}
        {reviews.length > 1 && (
          <View className="flex-row gap-1.5 mt-3">
            {reviews.map((_, idx) => (
              <View
                key={idx}
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: idx === activeIndex ? theme.colors.primary : "#D1D5DB",
                }}
              />
            ))}
          </View>
        )}
      </View>
    </SectionContainer>
  );`;

    case "FeaturedCollectionGrid":
      return `  const { products, loading, error } = useCollection(collectionId);
  const { theme } = useTheme();

  const handleRetry = () => {
    // Retry triggered by refetch
  };

  const displayedProducts = products ? products.slice(0, limit) : [];

  return (
    <SectionContainer
      sectionId={sectionId}
      loading={loading}
      error={error}
      onRetry={handleRetry}
      paddingY="medium"
      paddingX="medium"
    >
      <SectionHeading title={title} subtitle={subtitle} actionLabel="View All" onActionPress={() => {}} />

      {displayedProducts.length === 0 && !loading ? (
        <EmptyState title="No Products Found" description="Try selecting a different collection." />
      ) : (
        <View className="flex-row flex-wrap justify-between mt-1">
          {displayedProducts.map((p) => (
            <View key={p.id} style={{ width: columns === 2 ? "48%" : "31%" }}>
              <ProductCard product={p} showPrices={showPrices} />
            </View>
          ))}
        </View>
      )}
    </SectionContainer>
  );`;

    case "FeaturedCollectionSlider":
      return `  const { products, loading, error } = useCollection(collectionId);
  const { theme } = useTheme();

  const displayedProducts = products ? products.slice(0, limit) : [];

  return (
    <SectionContainer
      sectionId={sectionId}
      loading={loading}
      error={error}
      paddingY="medium"
      paddingX="none"
    >
      <View className="px-4">
        <SectionHeading title={title} subtitle={subtitle} actionLabel="View All" onActionPress={() => {}} />
      </View>

      {displayedProducts.length === 0 && !loading ? (
        <View className="px-4">
          <EmptyState title="No Products Found" />
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
          className="mt-1"
        >
          {displayedProducts.map((p) => (
            <View key={p.id} style={{ width: 150 }}>
              <ProductCard product={p} showPrices={showPrices} />
            </View>
          ))}
        </ScrollView>
      )}
    </SectionContainer>
  );`;

    case "CollectionListGrid":
      return `  const { collections, loading, error } = useCollections(collectionIds);

  return (
    <SectionContainer
      sectionId={sectionId}
      loading={loading}
      error={error}
      paddingY="medium"
      paddingX="medium"
    >
      <SectionHeading title={title} subtitle={subtitle} />

      {collections.length === 0 && !loading ? (
        <EmptyState title="No Collections" />
      ) : (
        <View className="w-full mt-1">
          {collections.map((col) => (
            <CollectionCard key={col.id} collection={col} />
          ))}
        </View>
      )}
    </SectionContainer>
  );`;

    case "CollectionListSlider":
      return `  const { collections, loading, error } = useCollections(collectionIds);

  return (
    <SectionContainer
      sectionId={sectionId}
      loading={loading}
      error={error}
      paddingY="medium"
      paddingX="none"
    >
      <View className="px-4">
        <SectionHeading title={title} subtitle={subtitle} />
      </View>

      {collections.length === 0 && !loading ? (
        <View className="px-4">
          <EmptyState title="No Collections" />
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
          className="mt-1"
        >
          {collections.map((col) => (
            <View key={col.id} style={{ width: 280 }}>
              <CollectionCard collection={col} />
            </View>
          ))}
        </ScrollView>
      )}
    </SectionContainer>
  );`;

    case "ProductImageGallery":
      return `  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const urls = imageUrls || [];

  if (urls.length === 0) return null;

  return (
    <SectionContainer sectionId={sectionId} paddingY="none" paddingX="none">
      <View className="relative w-full aspect-[4/5] bg-gray-50">
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={(e) => {
            const width = e.nativeEvent.layoutMeasurement.width;
            const offset = e.nativeEvent.contentOffset.x;
            if (width > 0) {
              setActiveIndex(Math.round(offset / width));
            }
          }}
          scrollEventThrottle={16}
        >
          {urls.map((url, idx) => (
            <View key={idx} style={{ width: 400, height: "100%" }} className="w-screen">
              <Image source={{ uri: url }} style={{ width: "100%", height: "100%" }} contentFit="cover" />
            </View>
          ))}
        </ScrollView>

        {/* Floating Indicator Dots */}
        {urls.length > 1 && (
          <View className="absolute bottom-4 left-0 right-0 flex-row justify-center gap-1.5">
            {urls.map((_, idx) => (
              <View
                key={idx}
                className="w-2 h-2 rounded-full shadow-sm"
                style={{
                  backgroundColor: idx === activeIndex ? activeDotColor : dotColor,
                }}
              />
            ))}
          </View>
        )}
      </View>
    </SectionContainer>
  );`;

    case "FeaturedProduct":
      return `  const { product, loading, error } = useProduct(productId);
  const { theme } = useTheme();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState({});

  useEffect(() => {
    if (product && product.options) {
      const initial = {};
      product.options.forEach((opt) => {
        if (opt.values.length > 0) {
          initial[opt.name] = opt.values[0];
        }
      });
      setSelectedVariants(initial);
    }
  }, [product]);

  if (loading) return <SectionContainer sectionId={sectionId} loading={true}><Text>Loading...</Text></SectionContainer>;
  if (error || !product) return <SectionContainer sectionId={sectionId} error={error || "Product not found"}><Text>Error</Text></SectionContainer>;

  // Find matching variant
  const currentVariant = product.variants.find((v) => {
    return v.selectedOptions.every((opt) => selectedVariants[opt.name] === opt.value);
  }) || product.variants[0];

  const price = parseFloat(currentVariant?.price.amount || product.priceRange.minVariantPrice.amount);
  const compareAtPrice = currentVariant?.compareAtPrice
    ? parseFloat(currentVariant.compareAtPrice.amount)
    : 0;
  const hasDiscount = compareAtPrice > price;

  const images = product.images.map(img => img.url);

  return (
    <SectionContainer sectionId={sectionId} paddingY="medium" paddingX="medium">
      <View className="w-full gap-4">
        {/* Product Images Swiper stub */}
        <View className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-gray-100" style={{ borderRadius: theme.radius.lg }}>
          <Image source={{ uri: images[0] }} style={{ width: "100%", height: "100%" }} contentFit="cover" />
        </View>

        {/* Details */}
        <View className="gap-2">
          {product.vendor && (
            <Text className="text-xs uppercase tracking-wider font-semibold" style={{ color: theme.colors.textMuted }}>
              {product.vendor}
            </Text>
          )}
          <Text className="text-2xl font-bold tracking-tight" style={{ color: theme.colors.text }}>
            {product.title}
          </Text>

          {/* Price */}
          <View className="flex-row items-center gap-2 mt-1">
            <Text className="text-xl font-extrabold" style={{ color: theme.colors.text }}>
              ₹{price.toLocaleString()}
            </Text>
            {hasDiscount && (
              <Text className="text-sm line-through" style={{ color: theme.colors.textMuted }}>
                ₹{compareAtPrice.toLocaleString()}
              </Text>
            )}
          </View>
        </View>

        {/* Variant Picker */}
        {showVariantPicker && product.options.map((opt) => (
          <View key={opt.name} className="gap-2 mt-1">
            <Text className="text-xs font-bold" style={{ color: theme.colors.text }}>
              {opt.name}: <Text className="font-medium" style={{ color: theme.colors.textMuted }}>{selectedVariants[opt.name]}</Text>
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {opt.values.map((val) => {
                const isSelected = selectedVariants[opt.name] === val;
                return (
                  <TouchableOpacity
                    key={val}
                    onPress={() => setSelectedVariants(prev => ({ ...prev, [opt.name]: val }))}
                    style={{
                      borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                      borderWidth: 1,
                      backgroundColor: isSelected ? theme.colors.primary + "10" : "transparent",
                      borderRadius: theme.radius.sm
                    }}
                    className="px-3 py-1.5"
                    activeOpacity={0.8}
                  >
                    <Text className="text-xs font-semibold" style={{ color: isSelected ? theme.colors.primary : theme.colors.text }}>
                      {val}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        {/* Quantity selector */}
        {showQuantitySelector && (
          <View className="flex-row items-center gap-4 mt-2">
            <Text className="text-xs font-bold" style={{ color: theme.colors.text }}>Quantity</Text>
            <View className="flex-row items-center border border-gray-200 rounded-lg overflow-hidden">
              <TouchableOpacity
                onPress={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-10 h-10 items-center justify-center bg-gray-50 border-r border-gray-200"
              >
                <Ionicons name="remove" size={18} color={theme.colors.text} />
              </TouchableOpacity>
              <Text className="w-12 text-center text-sm font-bold" style={{ color: theme.colors.text }}>{quantity}</Text>
              <TouchableOpacity
                onPress={() => setQuantity(q => q + 1)}
                className="w-10 h-10 items-center justify-center bg-gray-50 border-l border-gray-200"
              >
                <Ionicons name="add" size={18} color={theme.colors.text} />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Description */}
        {showDescription && product.description && (
          <View className="mt-2 border-t border-gray-100 pt-4 gap-2">
            <Text className="text-xs font-bold" style={{ color: theme.colors.text }}>Product Description</Text>
            <Text className="text-xs leading-relaxed font-medium" style={{ color: theme.colors.textMuted }}>
              {product.description}
            </Text>
          </View>
        )}

        {/* CTA Buttons */}
        <View className="gap-2.5 mt-4">
          <SectionCTA label="Add to Cart" variant="secondary" fullWidth={true} />
          {showBuyNow && (
            <SectionCTA label="Buy Now" variant="primary" fullWidth={true} />
          )}
        </View>
      </View>
    </SectionContainer>
  );`;

    case "Header":
      return `  const { theme, branding } = useTheme();

  const isCenterLogo = layout === "center-logo";

  return (
    <View
      style={{ backgroundColor: theme.colors.background, borderBottomWidth: 1, borderBottomColor: theme.colors.border }}
      className="flex-row items-center justify-between px-5 py-4 w-full"
    >
      {/* Left Icon */}
      <View className="w-10">
        {showMenu && (
          <TouchableOpacity activeOpacity={0.7}>
            <Ionicons name="menu-outline" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        )}
      </View>

      {/* Brand logo/name */}
      <View className={\`flex-1 \${isCenterLogo ? "items-center" : "items-start"}\`}>
        {logoUrl || branding.logoUrl ? (
          <Image
            source={{ uri: logoUrl || branding.logoUrl }}
            style={{ height: 28, width: 120 }}
            contentFit="contain"
          />
        ) : (
          <Text className="text-xl font-bold italic tracking-tight" style={{ color: theme.colors.primary }}>
            {branding.appName}
          </Text>
        )}
      </View>

      {/* Right icons */}
      <View className="flex-row items-center gap-4 w-16 justify-end">
        {showSearch && (
          <TouchableOpacity activeOpacity={0.7}>
            <Ionicons name="search-outline" size={22} color={theme.colors.text} />
          </TouchableOpacity>
        )}
        {showCart && (
          <TouchableOpacity activeOpacity={0.7} className="relative">
            <Ionicons name="bag-outline" size={22} color={theme.colors.text} />
            <View
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full items-center justify-center"
              style={{ backgroundColor: theme.colors.primary }}
            >
              <Text className="text-[8px] font-bold text-white">0</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );`;

    case "Footer":
      return `  const { theme, branding } = useTheme();
  const paymentIconsList = paymentIcons || [];

  return (
    <SectionContainer sectionId={sectionId} paddingY="large" paddingX="medium">
      <View className="w-full gap-6">
        {/* Brand section */}
        <View className="gap-2 items-center text-center">
          <Text className="text-lg font-bold" style={{ color: theme.colors.primary }}>
            {branding.appName}
          </Text>
          {text && (
            <Text className="text-xs text-center leading-relaxed font-semibold px-4" style={{ color: theme.colors.textMuted }}>
              {text}
            </Text>
          )}
        </View>

        {/* Social media connections */}
        {showSocials && (
          <View className="flex-row justify-center gap-5 mt-1">
            {["logo-instagram", "logo-facebook", "logo-twitter", "logo-youtube"].map((social) => (
              <TouchableOpacity key={social} activeOpacity={0.6}>
                <Ionicons name={social as any} size={20} color={theme.colors.text} />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Divider */}
        <View className="h-[1px] w-full" style={{ backgroundColor: theme.colors.border }} />

        {/* Legal & Payment icons */}
        <View className="flex-col gap-4 items-center">
          {paymentIconsList.length > 0 && (
            <View className="flex-row gap-3">
              {paymentIconsList.map((icon, idx) => (
                <Ionicons key={idx} name={icon as any} size={24} color={theme.colors.textMuted} />
              ))}
            </View>
          )}

          {copyrightText && (
            <Text className="text-[10px] text-center font-medium" style={{ color: theme.colors.textMuted }}>
              {copyrightText}
            </Text>
          )}
        </View>
      </View>
    </SectionContainer>
  );`;

    case "Newsletter":
      return `  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (!email.trim() || !email.includes("@")) return;
    setSubscribed(true);
    setEmail("");
  };

  const bg = bgColor || theme.colors.surface;

  return (
    <SectionContainer sectionId={sectionId} paddingY="large" paddingX="medium">
      <View
        style={{
          backgroundColor: bg,
          borderRadius: theme.radius.lg,
          borderWidth: 1,
          borderColor: theme.colors.border,
        }}
        className="p-6 items-center text-center gap-3 w-full"
      >
        <Ionicons name="mail-open-outline" size={32} color={theme.colors.primary} className="opacity-80" />
        
        <View className="items-center gap-1">
          {subtitle && (
            <Text className="text-[10px] font-bold uppercase tracking-wider" style={{ color: theme.colors.primary }}>
              {subtitle}
            </Text>
          )}
          {title && (
            <Text className="text-xl font-bold tracking-tight" style={{ color: theme.colors.text }}>
              {title}
            </Text>
          )}
        </View>

        {subscribed ? (
          <View className="items-center py-2 gap-1.5">
            <Ionicons name="checkmark-circle" size={24} color="#10B981" />
            <Text className="text-xs font-semibold text-emerald-600">
              {successMessage}
            </Text>
          </View>
        ) : (
          <View className="w-full gap-2.5 mt-2">
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder={placeholder}
              placeholderTextColor={theme.colors.textMuted + "80"}
              keyboardType="email-address"
              autoCapitalize="none"
              style={{
                borderRadius: theme.radius.md,
                borderColor: theme.colors.border,
                borderWidth: 1,
                color: theme.colors.text,
                backgroundColor: theme.colors.background,
              }}
              className="w-full px-4 py-3 text-xs font-medium"
            />
            <TouchableOpacity
              onPress={handleSubscribe}
              style={{
                backgroundColor: theme.colors.primary,
                borderRadius: theme.radius.md,
              }}
              className="w-full py-3 items-center justify-center"
              activeOpacity={0.8}
            >
              <Text className="text-white text-xs font-bold">{buttonText}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SectionContainer>
  );`;

    case "CountdownBanner":
      return `  const { theme } = useTheme();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    
    const updateTime = () => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const bg = bgColor || theme.colors.primary;
  const textCol = textColor || "#FFFFFF";

  const renderTimerBlock = (val, label) => (
    <View className="items-center bg-black/15 px-3 py-2 rounded-lg min-w-[50px]">
      <Text className="text-base font-black tracking-tight" style={{ color: textCol }}>
        {String(val).padStart(2, "0")}
      </Text>
      <Text className="text-[8px] font-bold uppercase opacity-80" style={{ color: textCol }}>
        {label}
      </Text>
    </View>
  );

  return (
    <SectionContainer sectionId={sectionId} paddingY="medium" paddingX="medium">
      <View
        style={{
          backgroundColor: bg,
          borderRadius: theme.radius.lg,
        }}
        className="w-full overflow-hidden flex-col relative"
      >
        {imageUrl ? (
          <View className="w-full aspect-[16/7] bg-gray-50">
            <Image source={{ uri: imageUrl }} style={{ width: "100%", height: "100%" }} contentFit="cover" />
            <View className="absolute inset-0 bg-black/50" />
          </View>
        ) : null}

        <View className={\`p-6 gap-4 w-full \${imageUrl ? "absolute inset-0 justify-center items-center" : "items-center"}\`}>
          <View className="items-center gap-1">
            {subtitle && (
              <Text className="text-[10px] uppercase font-bold tracking-widest" style={{ color: textCol }}>
                {subtitle}
              </Text>
            )}
            {title && (
              <Text className="text-xl font-extrabold tracking-tight text-center" style={{ color: textCol }}>
                {title}
              </Text>
            )}
          </View>

          {/* Live Timer */}
          <View className="flex-row gap-2">
            {renderTimerBlock(timeLeft.days, "Days")}
            {renderTimerBlock(timeLeft.hours, "Hrs")}
            {renderTimerBlock(timeLeft.minutes, "Mins")}
            {renderTimerBlock(timeLeft.seconds, "Secs")}
          </View>

          {ctaLabel && ctaUrl && (
            <TouchableOpacity
              className="bg-white/20 border border-white/40 px-5 py-2.5 rounded-lg mt-1"
              style={{ borderRadius: theme.radius.md }}
              activeOpacity={0.8}
            >
              <Text className="text-xs font-bold" style={{ color: textCol }}>{ctaLabel}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SectionContainer>
  );`;

    case "Slideshow":
      return `  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const slidesList = slides || [];

  useEffect(() => {
    if (!autoPlay || slidesList.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slidesList.length);
    }, interval * 1000);
    return () => clearInterval(timer);
  }, [autoPlay, interval, slidesList.length]);

  if (slidesList.length === 0) return null;
  const current = slidesList[activeIndex];

  return (
    <SectionContainer sectionId={sectionId} paddingY="none" paddingX="none">
      <View className="relative w-full aspect-[16/10] bg-gray-950">
        <Image
          source={{ uri: current.imageUrl }}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
        />
        {/* Dark overlay */}
        <View className="absolute inset-0 bg-black/35 justify-end p-6">
          <View className="gap-2 items-start self-start">
            {current.subtitle && (
              <Text className="text-white/90 text-[10px] font-bold uppercase tracking-wider">
                {current.subtitle}
              </Text>
            )}
            {current.title && (
              <Text className="text-white text-xl font-extrabold tracking-tight leading-tight">
                {current.title}
              </Text>
            )}
            {current.ctaLabel && (
              <TouchableOpacity
                style={{
                  backgroundColor: theme.colors.primary,
                  borderRadius: theme.radius.md,
                }}
                className="px-4 py-2 mt-1"
                activeOpacity={0.8}
              >
                <Text className="text-white font-bold text-[10px]">{current.ctaLabel}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Carousel indicator dots */}
        {slidesList.length > 1 && (
          <View className="absolute top-4 right-4 flex-row gap-1 bg-black/25 px-2.5 py-1 rounded-full">
            {slidesList.map((_, idx) => (
              <View
                key={idx}
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: idx === activeIndex ? theme.colors.primary : "#FFFFFF80",
                }}
              />
            ))}
          </View>
        )}
      </View>
    </SectionContainer>
  );`;

    default:
      return `  return (
    <SectionContainer sectionId={sectionId}>
      <Text>Component: ${name}</Text>
    </SectionContainer>
  );`;
  }
}

// Function to generate the files for a component
function scaffoldComponent(comp) {
  const dir = path.join(componentsDir, comp.name);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // 1. types.ts
  const typesContent = `export interface ${comp.name}Props {
  sectionId?: string;
${comp.props.map((p) => `  ${p.name}?: ${getTSType(p)};`).join("\n")}
}
`;
  fs.writeFileSync(path.join(dir, "types.ts"), typesContent);

  // 2. schema.ts
  const schemaContent = `import { z } from "zod";

export const ${comp.name}Schema = z.object({
${comp.props.map((p) => `  ${p.name}: ${getZodSchema(p)},`).join("\n")}
});

export type ${comp.name}PropsValidated = z.infer<typeof ${comp.name}Schema>;
`;
  fs.writeFileSync(path.join(dir, "schema.ts"), schemaContent);

  // 3. builder.ts
  const builderContent = `import type { BuilderMetadata } from "../registry";

export const ${comp.name}Builder: BuilderMetadata = {
  type: "${comp.name}",
  label: "${comp.name.replace(/([A-Z])/g, ' $1').trim()}",
  description: "Stiletto theme ${comp.name} section component.",
  category: "${comp.category}",
  fields: [
    ${comp.props.map((p) => getBuilderField(p)).join(",\n    ")}
  ]
};
`;
  fs.writeFileSync(path.join(dir, "builder.ts"), builderContent);

  // 4. Component.tsx
  const isShopifyComp = ["FeaturedCollectionGrid", "FeaturedCollectionSlider", "CollectionListGrid", "CollectionListSlider", "FeaturedProduct"].includes(comp.name);
  const extraImports = isShopifyComp
    ? `import { ScrollView } from "react-native";
import { ${comp.name === "FeaturedProduct" ? "useProduct" : comp.name.startsWith("CollectionList") ? "useCollections" : "useCollection"} } from "../../hooks/${comp.name === "FeaturedProduct" ? "useProduct" : comp.name.startsWith("CollectionList") ? "useCollections" : "useCollection"}";
import { ProductCard, CollectionCard, EmptyState } from "../primitives";`
    : "";

  const textInputImport = comp.name === "Newsletter" ? ", TextInput" : "";

  const componentContent = `import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity${textInputImport} } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../providers/ThemeProvider";
import { SectionContainer, SectionHeading, SectionCTA } from "../primitives";
${extraImports}
import type { ${comp.name}Props } from "./types";

export function ${comp.name}({
  sectionId,
  ${comp.props.map((p) => `${p.name},`).join("\n  ")}
}: ${comp.name}Props) {
${getComponentImpl(comp.name)}
}
`;
  fs.writeFileSync(path.join(dir, "Component.tsx"), componentContent);

  // 5. index.ts
  const indexContent = `export * from "./Component";
export * from "./types";
export * from "./schema";
export * from "./builder";
`;
  fs.writeFileSync(path.join(dir, "index.ts"), indexContent);

  console.log(`Scaffolded ${comp.name} successfully.`);
}

// Scaffold all components
components.forEach(scaffoldComponent);
console.log("All components scaffolded successfully!");
