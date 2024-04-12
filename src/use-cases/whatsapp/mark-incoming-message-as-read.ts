import { AxiosError } from 'axios';

import { api } from '@/lib/axios';

type MarkIncomingMessageAsReadUseCaseInput = {
  businessPhoneNumberId: string;
  messageId: string;
};

type MarkIncomingMessageAsReadUseCaseOutput = Promise<void>;

export class MarkIncomingMessageAsReadUseCase {
  async execute({
    businessPhoneNumberId,
    messageId,
  }: MarkIncomingMessageAsReadUseCaseInput): MarkIncomingMessageAsReadUseCaseOutput {
    await api
      .post(`/${businessPhoneNumberId}/messages`, {
        messaging_product: 'whatsapp',
        status: 'read',
        message_id: messageId,
      })
      .catch((error: AxiosError) => {
        console.log(
          'MarkIncomingMessageAsReadUseCase\n',
          error.message,
          error.response?.data,
        );
      });
  }
}
