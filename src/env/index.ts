import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  NODE_PORT: z.coerce.number().default(8080),
  WEBHOOK_VERIFY_TOKEN: z.string(),
  GRAPH_API_TOKEN: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('Invalid environment variables', _env.error.format());

  throw new Error('Invalid environment variables.');
}

const env = _env.data;

export { env };
