import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { env } from '@/env';

export async function verifyWebhook(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const webhookQuerySchema = z.object({
    'hub.mode': z.string(),
    'hub.verify_token': z.string(),
    'hub.challenge': z.string(),
  });

  const webhookData = webhookQuerySchema.parse(request.query);

  const mode = webhookData['hub.mode'];
  const token = webhookData['hub.verify_token'];
  const challenge = webhookData['hub.challenge'];

  if (mode === 'subscribe' && token === env.WEBHOOK_VERIFY_TOKEN) {
    reply.status(200).send(challenge);

    console.log('Webhook verified successfully!');
  } else {
    reply.status(403).send();
  }
}
