import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { signInSchema } from "@/lib/validation";

const app = new Hono().post(
  "/login",
  zValidator("json", signInSchema),
  async (c) => {
    const { email, password } = await c.req.valid("json");

    console.log({ email, password });

    return c.json({ email, password });
  },
);

export default app;
