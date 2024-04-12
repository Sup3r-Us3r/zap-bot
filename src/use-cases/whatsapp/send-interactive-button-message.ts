import { AxiosError } from 'axios';

import { api } from '@/lib/axios';
import { InteractiveButtonMessage } from '@/services/whatsapp-business-api/helpers/interactive-button-message/types';

type SendInteractiveButtonMessageUseCaseInput = {
  businessPhoneNumberId: string;
  message: InteractiveButtonMessage;
  to: string;
  contextMessageId: string;
};

type SendInteractiveButtonMessageUseCaseOutput = Promise<void>;

export class SendInteractiveButtonMessageUseCase {
  async execute({
    businessPhoneNumberId,
    to,
    message,
    contextMessageId,
  }: SendInteractiveButtonMessageUseCaseInput): SendInteractiveButtonMessageUseCaseOutput {
    await api
      .post(`/${businessPhoneNumberId}/messages`, {
        messaging_product: 'whatsapp',
        to,
        type: 'interactive',
        interactive: {
          type: 'button',
          ...message,
        },
        context: {
          message_id: contextMessageId,
        },
      })
      .catch((error: AxiosError) => {
        console.log(
          'SendInteractiveButtonMessageUseCase\n',
          error.message,
          error.response?.data,
        );
      });
  }
}
