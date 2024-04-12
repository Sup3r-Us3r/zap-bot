import { servicesTextData } from '@/services/whatsapp-business-api/helpers/text-message/services-text-data';
import type {
  WhatsAppBusinessTextMessage,
  WhatsAppBusinessMessageReceivedPayload,
} from '@/services/whatsapp-business-api/types';
import { fixBrazilPhoneNumber } from '@/utils/fix-brazil-phone-number';
import { Customer } from '@prisma/client';

import { makeSaveCustomerUseCase } from '../factories/customer/make-save-customer-use-case';
import { makeSendTextMessageUseCase } from '../factories/whatsapp/make-send-text-message-use-case';

type SelectServiceUseCaseInput = {
  whatsAppBusinessAPIData: WhatsAppBusinessMessageReceivedPayload;
  customer: Customer;
};

type SelectServiceUseCaseOutput = Promise<void>;

export class SelectServiceUseCase {
  async execute({
    whatsAppBusinessAPIData,
    customer,
  }: SelectServiceUseCaseInput): SelectServiceUseCaseOutput {
    const changesValue =
      whatsAppBusinessAPIData?.entry?.[0]?.changes?.[0]?.value;
    const businessPhoneNumberId = changesValue?.metadata?.phone_number_id;
    const message = changesValue?.messages?.[0] as WhatsAppBusinessTextMessage;
    const contextMessageId = message?.id;

    const sendTextMessageUseCase = makeSendTextMessageUseCase();
    const saveCustomerUseCase = makeSaveCustomerUseCase();

    // 3 - Select service
    await sendTextMessageUseCase.execute({
      businessPhoneNumberId,
      message: servicesTextData.message,
      to: fixBrazilPhoneNumber(message.from),
      contextMessageId,
    });

    // Update step
    await saveCustomerUseCase.execute({
      data: {
        ...customer,
        step: 3,
        updated_at: new Date(),
      },
    });
  }
}
