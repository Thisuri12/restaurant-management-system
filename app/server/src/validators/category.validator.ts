import z from "zod";

//Category Schema
export const createCategorySchema = z.object({
  name: z.string().min(2),
  restaurant_id: z.number().int().positive(),
});

export const getCategorySchema = z.object({
  name: z.string().min(2).optional(),
  restaurant_id: z.number().int().positive().optional(),
  page: z.preprocess(
    (val) => Number(val ?? 1),
    z.number().int().positive().optional().default(1)
  ),
  limit: z.preprocess(
    (val) => Number(val ?? 10),
    z.number().int().positive().optional().default(10)
  ),
});

export const updateCategorySchema = z.object({
  name: z.string().min(2).optional(),
  restaurant_id: z.number().int().positive().optional(),
});

export const deleteCategorySchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "ID must be a valid number")
    .transform((val) => Number(val)),
});
