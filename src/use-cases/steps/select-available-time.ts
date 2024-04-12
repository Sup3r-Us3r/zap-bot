import { availableAppointmentsTextData } from '@/services/whatsapp-business-api/helpers/text-message/available-appointments-text-data';
import type {
  WhatsAppBusinessTextMessage,
  WhatsAppBusinessMessageReceivedPayload,
} from '@/services/whatsapp-business-api/types';
import { fixBrazilPhoneNumber } from '@/utils/fix-brazil-phone-number';
import { Customer } from '@prisma/client';

import { makeSaveCustomerUseCase } from '../factories/customer/make-save-customer-use-case';
import { makeSendTextMessageUseCase } from '../factories/whatsapp/make-send-text-message-use-case';

type SelectAvailableTimeUseCaseInput = {
  whatsAppBusinessAPIData: WhatsAppBusinessMessageReceivedPayload;
  customer: Customer;
};

type SelectAvailableTimeUseCaseOutput = Promise<void>;

export class SelectAvailableTimeUseCase {
  async execute({
    whatsAppBusinessAPIData,
    customer,
  }: SelectAvailableTimeUseCaseInput): SelectAvailableTimeUseCaseOutput {
    const changesValue =
      whatsAppBusinessAPIData?.entry?.[0]?.changes?.[0]?.value;
    const businessPhoneNumberId = changesValue?.metadata?.phone_number_id;
    const message = changesValue?.messages?.[0] as WhatsAppBusinessTextMessage;
    const contextMessageId = message?.id;

    const sendTextMessageUseCase = makeSendTextMessageUseCase();
    const saveCustomerUseCase = makeSaveCustomerUseCase();

    // 4 - Select available time
    await sendTextMessageUseCase.execute({
      businessPhoneNumberId,
      message: availableAppointmentsTextData.message,
      to: fixBrazilPhoneNumber(message.from),
      contextMessageId,
    });

    // Update step
    await saveCustomerUseCase.execute({
      data: {
        ...customer,
        step: 4,
        updated_at: new Date(),
      },
    });
  }
}
