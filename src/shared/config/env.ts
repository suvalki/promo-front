import { z } from "zod";

const DEFAULT_API_URL = "http://localhost:3001";

const envSchema = z.object({
  VITE_API_URL: z.string().url().catch(DEFAULT_API_URL),
});

export const env = envSchema.parse(import.meta.env);
