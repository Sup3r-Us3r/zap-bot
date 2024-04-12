import { AxiosError } from 'axios';

import { api } from '@/lib/axios';

type SendTextMessageUseCaseInput = {
  businessPhoneNumberId: string;
  message: string;
  to: string;
  contextMessageId: string;
};

type SendTextMessageUseCaseOutput = Promise<void>;

export class SendTextMessageUseCase {
  async execute({
    businessPhoneNumberId,
    to,
    message,
    contextMessageId,
  }: SendTextMessageUseCaseInput): SendTextMessageUseCaseOutput {
    // send a reply message as per the docs here https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages
    await api
      .post(`/${businessPhoneNumberId}/messages`, {
        messaging_product: 'whatsapp',
        to,
        text: { body: message },
        // shows the message as a reply to the original user message
        context: {
          message_id: contextMessageId,
        },
      })
      .catch((error: AxiosError) => {
        console.log(
          'SendTextMessageUseCase\n',
          error.message,
          error.response?.data,
        );
      });
  }
}
