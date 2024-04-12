import type {
  WhatsAppBusinessButtonMessage,
  WhatsAppBusinessMessageReceivedPayload,
} from '@/services/whatsapp-business-api/types';
import { fixBrazilPhoneNumber } from '@/utils/fix-brazil-phone-number';

import { makeSendTextMessageUseCase } from '../factories/whatsapp/make-send-text-message-use-case';

type SendWelcomeMessageUseCaseInput = {
  whatsAppBusinessAPIData: WhatsAppBusinessMessageReceivedPayload;
};

type SendWelcomeMessageUseCaseOutput = Promise<void>;

export class SendWelcomeMessageUseCase {
  async execute({
    whatsAppBusinessAPIData,
  }: SendWelcomeMessageUseCaseInput): SendWelcomeMessageUseCaseOutput {
    const changesValue =
      whatsAppBusinessAPIData?.entry?.[0]?.changes?.[0]?.value;
    const businessPhoneNumberId = changesValue?.metadata?.phone_number_id;
    const customerName = changesValue?.contacts?.[0]?.profile?.name;
    const message = changesValue
      ?.messages?.[0] as WhatsAppBusinessButtonMessage;
    const contextMessageId = message?.id;

    const sendTextMessageUseCase = makeSendTextMessageUseCase();

    await sendTextMessageUseCase.execute({
      businessPhoneNumberId,
      message: `Seja muito bem vindo ${customerName ? `*${customerName}*` : ''}, vamos iniciar seu atendimento para agendar um horário conosco 🤩`,
      to: fixBrazilPhoneNumber(message.from),
      contextMessageId,
    });
  }
}
