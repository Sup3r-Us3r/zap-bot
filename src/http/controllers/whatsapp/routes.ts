import { FastifyInstance } from 'fastify';

import { receiveMessage } from './receive-message';
import { verifyWebhook } from './verify-webhook';

export async function webhookRoutes(app: FastifyInstance) {
  app.get('/webhook', verifyWebhook);
  app.post('/webhook', receiveMessage);
}
