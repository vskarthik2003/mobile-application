import { z } from "zod";

export const ScrollableTextSectionSchema = z.object({
  bgColor: z.string().default("#242526"),
  textColor: z.string().default("#faf7c3"),
  duration: z.number().default(10),
  direction: z.enum(["ltr", "rtl"]),
});

export type ScrollableTextSectionPropsValidated = z.infer<
  typeof ScrollableTextSectionSchema
>;
