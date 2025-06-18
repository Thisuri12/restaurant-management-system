import { z } from "zod";

// Create Order
export const createOrderSchema = z.object({
  user_id: z.number().int().positive(),
  items: z.array(
    z.object({
      dish_id: z.number().int().positive(),
      quantity: z.number().int().positive(),
    })
  ),
});

// Get Orders with filters and pagination
export const getOrderSchema = z.object({
  user_id: z.number().int().positive().optional(),
  skip: z.preprocess(
    (val) => Number(val ?? 0),
    z.number().int().nonnegative().optional().default(0)
  ),
  limit: z.preprocess(
    (val) => Number(val ?? 10),
    z.number().int().positive().optional().default(10)
  ),
  status: z.enum(["pending", "preparing", "delivered", "cancelled"]).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

// Update Order
export const updateOrderSchema = z.object({
  user_id: z.number().int().positive().optional(),
  items: z.array(
    z.object({
      dish_id: z.number().int().positive().optional(),
      quantity: z.number().int().positive().optional(),
    })
  ),
  status: z.enum(["pending", "preparing", "delivered", "cancelled"]).optional(),
});

// Delete Order by ID
export const deleteOrderSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "ID must be a valid number")
    .transform((val) => Number(val)),
});
