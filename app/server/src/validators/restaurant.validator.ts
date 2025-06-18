import { z } from "zod";

export const createRestaurantSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  open_time: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Open time must be in HH:MM format"),
  close_time: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Close time must be in HH:MM format"),
  min_price: z.number().nonnegative("Minimum price must be 0 or more"),
  delivery_fee: z.number().nonnegative("Delivery fee must be 0 or more"),
});

export const getRestaurantsSchema = z.object({
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

export const updateRestaurantSchema = z.object({
  name: z.string().min(2).optional(),
  location: z.string().min(3).optional(),
  lat: z.number().min(-90).max(90).optional(),
  lng: z.number().min(-180).max(180).optional(),
  open_time: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Open time must be in HH:MM format")
    .optional(),
  close_time: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Open time must be in HH:MM format")
    .optional(),
  min_price: z
    .number()
    .nonnegative("Minimum price must be 0 or more")
    .optional(),
  delivery_fee: z
    .number()
    .nonnegative("Delivery fee must be 0 or more")
    .optional(),
});

export const deleteRestaurantSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "ID must be a valid number")
    .transform((val) => Number(val)),
});
