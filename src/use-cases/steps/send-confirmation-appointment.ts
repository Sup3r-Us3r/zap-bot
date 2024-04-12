import { confirmAppointmentButtonData } from '@/services/whatsapp-business-api/helpers/interactive-button-message/confirm-appointment-button-data';
import type {
  WhatsAppBusinessButtonMessage,
  WhatsAppBusinessMessageReceivedPayload,
} from '@/services/whatsapp-business-api/types';
import { fixBrazilPhoneNumber } from '@/utils/fix-brazil-phone-number';
import { Customer } from '@prisma/client';

import { makeSaveCustomerUseCase } from '../factories/customer/make-save-customer-use-case';
import { makeSendInteractiveButtonMessageUseCase } from '../factories/whatsapp/make-send-interactive-button-message-use-case';

type SendConfirmationAppointmentUseCaseInput = {
  whatsAppBusinessAPIData: WhatsAppBusinessMessageReceivedPayload;
  customer: Customer;
};

type SendConfirmationAppointmentUseCaseOutput = Promise<void>;

export class SendConfirmationAppointmentUseCase {
  async execute({
    whatsAppBusinessAPIData,
    customer,
  }: SendConfirmationAppointmentUseCaseInput): SendConfirmationAppointmentUseCaseOutput {
    const changesValue =
      whatsAppBusinessAPIData?.entry?.[0]?.changes?.[0]?.value;
    const businessPhoneNumberId = changesValue?.metadata?.phone_number_id;
    const message = changesValue
      ?.messages?.[0] as WhatsAppBusinessButtonMessage;
    const contextMessageId = message?.id;

    const sendInteractiveButtonMessageUseCase =
      makeSendInteractiveButtonMessageUseCase();
    const saveCustomerUseCase = makeSaveCustomerUseCase();

    // 5 - Send confirmation appointment
    await sendInteractiveButtonMessageUseCase.execute({
      businessPhoneNumberId,
      message: confirmAppointmentButtonData,
      to: fixBrazilPhoneNumber(message.from),
      contextMessageId,
    });

    // Update step
    await saveCustomerUseCase.execute({
      data: {
        ...customer,
        step: 5,
        updated_at: new Date(),
      },
    });
  }
}
