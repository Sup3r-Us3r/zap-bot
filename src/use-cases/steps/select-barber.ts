import {
  type BarberData,
  barberButtonData,
} from '@/services/whatsapp-business-api/helpers/interactive-button-message/barber-button-data';
import type {
  WhatsAppBusinessButtonMessage,
  WhatsAppBusinessMessageReceivedPayload,
} from '@/services/whatsapp-business-api/types';
import { fixBrazilPhoneNumber } from '@/utils/fix-brazil-phone-number';
import { Customer } from '@prisma/client';

import { makeSaveCustomerUseCase } from '../factories/customer/make-save-customer-use-case';
import { makeSendInteractiveButtonMessageUseCase } from '../factories/whatsapp/make-send-interactive-button-message-use-case';

type SelectBarberUseCaseInput = {
  whatsAppBusinessAPIData: WhatsAppBusinessMessageReceivedPayload;
  customer: Customer;
};

type SelectBarberUseCaseOutput = Promise<void>;

export class SelectBarberUseCase {
  async execute({
    whatsAppBusinessAPIData,
    customer,
  }: SelectBarberUseCaseInput): SelectBarberUseCaseOutput {
    const changesValue =
      whatsAppBusinessAPIData?.entry?.[0]?.changes?.[0]?.value;
    const businessPhoneNumberId = changesValue?.metadata?.phone_number_id;
    const message = changesValue
      ?.messages?.[0] as WhatsAppBusinessButtonMessage;
    const contextMessageId = message?.id;

    const sendInteractiveButtonMessageUseCase =
      makeSendInteractiveButtonMessageUseCase();
    const saveCustomerUseCase = makeSaveCustomerUseCase();

    // 2 - Select barber
    const barberData: BarberData[] = [
      { id: 'baber-1', name: 'Barber 1' },
      { id: 'baber-2', name: 'Barber 2' },
      { id: 'baber-3', name: 'Barber 3' },
    ];
    const barbersToSelection = barberData.map(barber => {
      return sendInteractiveButtonMessageUseCase.execute({
        businessPhoneNumberId,
        message: barberButtonData(barber),
        to: fixBrazilPhoneNumber(message.from),
        contextMessageId,
      });
    });

    await Promise.all(barbersToSelection);

    // Update step
    await saveCustomerUseCase.execute({
      data: {
        ...customer,
        step: 2,
        updated_at: new Date(),
      },
    });
  }
}
