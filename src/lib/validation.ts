import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email(),
  password: z.string().min(1, "Password is required"),
});

export const signUpSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().min(1, "Email is required").email(),
  password: z.string().min(8, "The password should be at least 8 characters"),
});