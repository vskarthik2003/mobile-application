import { z } from "zod";

export const HeaderSchema = z.object({
  logoUrl: z.string().default(""),
  showSearch: z.boolean().default(true),
  showCart: z.boolean().default(true),
  showMenu: z.boolean().default(true),
  layout: z.enum(["default", "center-logo"]).default("default"),
  bgColor: z.string(),
});

export type HeaderPropsValidated = z.infer<typeof HeaderSchema>;
