import { z } from "zod";

export const NewsletterSchema = z.object({
  title: z.string().default("Subscribe to Newsletter"),
  subtitle: z.string().default("Stay Updated"),
  placeholder: z.string().default("Enter your email address"),
  buttonText: z.string().default("Join Now"),
  successMessage: z.string().default("Thank you for subscribing!"),
  bgColor: z.string().default(""),
});

export type NewsletterPropsValidated = z.infer<typeof NewsletterSchema>;
