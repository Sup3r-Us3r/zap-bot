import { AxiosError } from 'axios';

import { api } from '@/lib/axios';
import { InteractiveListMessage } from '@/services/whatsapp-business-api/helpers/interactive-list-message/types';

type SendInteractiveListMessageUseCaseInput = {
  businessPhoneNumberId: string;
  message: InteractiveListMessage;
  to: string;
  contextMessageId: string;
};

type SendInteractiveListMessageUseCaseOutput = Promise<void>;

export class SendInteractiveListMessageUseCase {
  async execute({
    businessPhoneNumberId,
    to,
    message,
    contextMessageId,
  }: SendInteractiveListMessageUseCaseInput): SendInteractiveListMessageUseCaseOutput {
    await api
      .post(`/${businessPhoneNumberId}/messages`, {
        messaging_product: 'whatsapp',
        to,
        type: 'interactive',
        interactive: {
          type: 'list',
          ...message,
        },
        context: {
          message_id: contextMessageId,
        },
      })
      .catch((error: AxiosError) => {
        console.log(
          'SendInteractiveListMessageUseCase\n',
          error.message,
          error.response?.data,
        );
      });
  }
}
