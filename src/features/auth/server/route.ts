import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { signInSchema, signUpSchema } from "@/lib/validation";

const app = new Hono()
  .post("/login", zValidator("json", signInSchema), async (c) => {
    const { email, password } = await c.req.valid("json");

    return c.json({ email, password });
  })
  .post("/register", zValidator("json", signUpSchema), async (c) => {
    const { email, name, password } = await c.req.valid("json");

    return c.json({ email, name, password });
  });

export default app;
