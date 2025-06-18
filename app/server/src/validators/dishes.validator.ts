import { z } from "zod";

export const createDishSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  price: z.number().nonnegative("There must be a price for each dish"),
  description: z.string().optional(),
  image_url: z.string().url().optional(),
  category_id: z.number().int().positive(),
});

export const getDishSchema = z.object({
  name: z.string().min(2).optional(),
  skip: z.preprocess(
    (val) => Number(val ?? 0),
    z.number().int().nonnegative().optional().default(0)
  ),
  limit: z.preprocess(
    (val) => Number(val ?? 10),
    z.number().int().positive().optional().default(10)
  ),
});

export const updateDishSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  price: z
    .number()
    .nonnegative("There must be a price for each dish")
    .optional(),
  description: z.string().optional(),
  image_url: z.string().url().optional(),
  category_id: z.number().int().positive(),
});

export const deleteDishSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "ID must be a valid number")
    .transform((val) => Number(val)),
});
