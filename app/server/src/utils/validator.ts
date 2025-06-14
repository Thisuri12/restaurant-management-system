import { z } from "zod";

export const registerSchema = z.object({
  full_name: z
    .string()
    .min(2, "Name is too short.")
    .max(50, "Name is too long.")
    .regex(/^[a-zA-Z\s]+$/, "Only letters and spaces allowed"),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Too short! Password must be at least 8 characters")
    .max(32),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Too short! Password must be at least 8 characters")
    .max(32),
});
