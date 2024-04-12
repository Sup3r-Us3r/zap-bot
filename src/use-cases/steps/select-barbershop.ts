import { barbershopAddressListData } from '@/services/whatsapp-business-api/helpers/interactive-list-message/barbershop-address-list-data';
import type {
  WhatsAppBusinessListMessage,
  WhatsAppBusinessMessageReceivedPayload,
} from '@/services/whatsapp-business-api/types';
import { fixBrazilPhoneNumber } from '@/utils/fix-brazil-phone-number';
import { Customer } from '@prisma/client';

import { makeSaveCustomerUseCase } from '../factories/customer/make-save-customer-use-case';
import { makeSendInteractiveListMessageUseCase } from '../factories/whatsapp/make-send-interactive-list-message-use-case';

type SelectBarbershopUseCaseInput = {
  whatsAppBusinessAPIData: WhatsAppBusinessMessageReceivedPayload;
  customer: Customer;
};

type SelectBarbershopUseCaseOutput = Promise<void>;

export class SelectBarbershopUseCase {
  async execute({
    whatsAppBusinessAPIData,
    customer,
  }: SelectBarbershopUseCaseInput): SelectBarbershopUseCaseOutput {
    const changesValue =
      whatsAppBusinessAPIData?.entry?.[0]?.changes?.[0]?.value;
    const businessPhoneNumberId = changesValue?.metadata?.phone_number_id;
    const message = changesValue?.messages?.[0] as WhatsAppBusinessListMessage;
    const contextMessageId = message?.id;

    const sendInteractiveListMessageUseCase =
      makeSendInteractiveListMessageUseCase();
    const saveCustomerUseCase = makeSaveCustomerUseCase();

    // 1 - Select barbershop
    await sendInteractiveListMessageUseCase.execute({
      businessPhoneNumberId,
      message: barbershopAddressListData,
      to: fixBrazilPhoneNumber(message.from),
      contextMessageId,
    });

    // Update step
    await saveCustomerUseCase.execute({
      data: {
        ...customer,
        step: 1,
        updated_at: new Date(),
      },
    });
  }
}
