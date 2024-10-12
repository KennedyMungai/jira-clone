import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email(),
  password: z.string().min(8, "Password is required"),
});
