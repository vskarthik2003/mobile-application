import { z } from "zod";

export const FooterSchema = z.object({
  text: z.string().default("Your destination for minimal premium wardrobe staples."),
  showSocials: z.boolean().default(true),
  copyrightText: z.string().default("© 2026 Stiletto Inc. All rights reserved."),
  paymentIcons: z.array(z.string()).default(["logo-visa", "logo-mastercard", "card-outline"]),
});

export type FooterPropsValidated = z.infer<typeof FooterSchema>;
