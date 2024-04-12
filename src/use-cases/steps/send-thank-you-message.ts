import type {
  WhatsAppBusinessButtonMessage,
  WhatsAppBusinessMessageReceivedPayload,
} from '@/services/whatsapp-business-api/types';
import { fixBrazilPhoneNumber } from '@/utils/fix-brazil-phone-number';
import { Customer } from '@prisma/client';

import { makeSaveCustomerUseCase } from '../factories/customer/make-save-customer-use-case';
import { makeSendTextMessageUseCase } from '../factories/whatsapp/make-send-text-message-use-case';

type SendThankYouMessageUseCaseInput = {
  whatsAppBusinessAPIData: WhatsAppBusinessMessageReceivedPayload;
  customer: Customer;
};

type SendThankYouMessageUseCaseOutput = Promise<void>;

export class SendThankYouMessageUseCase {
  async execute({
    whatsAppBusinessAPIData,
    customer,
  }: SendThankYouMessageUseCaseInput): SendThankYouMessageUseCaseOutput {
    const changesValue =
      whatsAppBusinessAPIData?.entry?.[0]?.changes?.[0]?.value;
    const businessPhoneNumberId = changesValue?.metadata?.phone_number_id;
    const message = changesValue
      ?.messages?.[0] as WhatsAppBusinessButtonMessage;
    const contextMessageId = message?.id;

    const sendTextMessageUseCase = makeSendTextMessageUseCase();
    const saveCustomerUseCase = makeSaveCustomerUseCase();

    // 6 - Receive confirmation of appointment
    await sendTextMessageUseCase.execute({
      businessPhoneNumberId,
      message:
        message.interactive.button_reply.id === 'confirm-appointment-yes'
          ? 'Horário agendado com sucesso, muito obrigado pela preferência!'
          : 'Que pena 🥺 que não pode concluir o agendamento com a gente, até a próxima!',
      to: fixBrazilPhoneNumber(message.from),
      contextMessageId,
    });

    // Update step
    await saveCustomerUseCase.execute({
      data: {
        ...customer,
        step: 6,
        updated_at: new Date(),
      },
    });
  }
}
