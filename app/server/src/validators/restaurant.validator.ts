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
  name: z.string().optional(),
  page: z.preprocess(
    (val) => Number(val ?? 1),
    z.number().int().positive().optional().default(1)
  ),
  limit: z.preprocess(
    (val) => Number(val ?? 10),
    z.number().int().positive().optional().default(10)
  ),
});

export const updateRestaurantSchema = z.object({
  name: z.string().optional(),
  location: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  open_time: z.string().optional(),
  close_time: z.string().optional(),
  min_price: z.number().optional(),
  delivery_fee: z.number().optional(),
});

export const deleteRestaurantSchema = z.object({
  id: z.string().regex(/^\d+$/, "ID must be a valid number"),
});
