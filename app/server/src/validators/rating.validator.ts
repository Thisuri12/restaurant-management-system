import { z } from "zod";

export const createRatingSchema = z.object({
  dish_id: z.number().int().positive(),
  rating: z.number().min(1).max(5),
  comment: z.string().max(300).optional(),
});

export const getRatingSchema = z.object({
  dish_id: z.number().int().positive(),
  sort: z.enum(["recent", "highest", "lowest"]).optional(),
  skip: z.preprocess(
    (val) => Number(val ?? 0),
    z.number().int().nonnegative().optional().default(0)
  ),
  limit: z.preprocess(
    (val) => Number(val ?? 10),
    z.number().int().positive().optional().default(10)
  ),
});

export const updateRatingSchema = z.object({
  rating: z.number().min(1).max(5).optional(),
  comment: z.string().optional(),
});

export const deleteRatingSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "ID must be a valid number")
    .transform((val) => Number(val)),
});
