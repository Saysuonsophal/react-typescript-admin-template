//Product Validation Schema (Zod)
//Explanation:
// z.object() → Define structure.
// z.coerce.number() → Converts string input to number.
// z.infer → Auto TypeScript type from schema.

import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  // price: z.number().min(0, "Price is required"),
  // qty: z.number().int().min(0, "Quantity must be 0 or more"),
  // categoryId: z.number(),
  price: z.coerce.number().min(0, "Price required"),
  qty: z.coerce.number().min(0, "Quantity required"),
  categoryId: z
    .union([z.undefined(), z.number().min(1, "Category is required")])
    .refine((value) => value !== undefined, {
      message: "Category is required",
    }),

  description: z.string(),
  color: z
    .string()
    .min(1, "Please select a color")
    .regex(/^#([0-9A-F]{3}){1,2}$/i, "Invalid HEX color"),
  // .refine((val) => val !== "" && val !== null, {
  //   message: "Please select a color",
  // }),

  isActive: z.boolean(),
});

export type productSchema = z.infer<typeof productSchema>;

//Convert all field to optional
export const updateProductSchema = productSchema.partial();
export const createProductSchema = productSchema;
