import { z } from "zod";

export const AnnouncementBarSchema = z.object({
  messages: z.array(z.string()).default(["Hello", "Welcome", "Big Sale Today", "Free Shipping"]),
  bgColor: z.string().default("#FAF7C3"),
  textColor: z.string().default("#242526"),
  autoPlay: z.boolean().default(true),
  timeGap: z.number().default(3),
});

export type AnnouncementBarPropsValidated = z.infer<typeof AnnouncementBarSchema>;
