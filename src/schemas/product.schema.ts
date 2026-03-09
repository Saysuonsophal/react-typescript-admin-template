//Product Validation Schema (Zod)
//Explanation:
// z.object() → Define structure.
// z.coerce.number() → Converts string input to number.
// z.infer → Auto TypeScript type from schema.

import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(1, "Price is required"),
  qty: z.number().int().min(0, "Quantity must be 0 or more"),
  categoryId: z.number(),
  description: z.string(),
  color: z.string().min(1, "Please select a color"),
  //.regex(/^#([0-9A-F]{3}){1,2}$/i, "Invalid HEX color")
  // .refine((val) => val !== "#3b82f6", {
  //   message: "Please select a color",
  // }),

  isActive: z.boolean(),
});

export type ProductSchema = z.infer<typeof productSchema>;
