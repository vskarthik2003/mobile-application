import { z } from "zod";

export const MultiColumnSchema = z.object({
  title: z.string().default("Why Choose Us"),
  subtitle: z.string().default("The Stiletto Promise"),
  columnCount: z.number().default(3),
  columns: z.array(z.any()).default([
          { id: "1", title: "Free Shipping", text: "On all orders above ₹5000", icon: "airplane-outline" },
          { id: "2", title: "Easy Returns", text: "30-day hassle-free exchange policy", icon: "refresh-outline" },
          { id: "3", title: "Premium Quality", text: "Made with 100% certified organic fabrics", icon: "ribbon-outline" }
        ]),
});

export type MultiColumnPropsValidated = z.infer<typeof MultiColumnSchema>;
