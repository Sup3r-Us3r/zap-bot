import fastify from 'fastify';

import cors from '@fastify/cors';

import { webhookRoutes } from './http/controllers/whatsapp/routes';

const app = fastify({
  logger: false,
});

app.register(cors);
app.register(webhookRoutes);

export { app };
