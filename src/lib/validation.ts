import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email(),
  password: z.string().min(1, "Password is required"),
});
