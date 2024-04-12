import { FastifyReply, FastifyRequest } from 'fastify';

import type { WhatsAppBusinessMessageReceivedPayload } from '@/services/whatsapp-business-api/types';
import { makeFindCustomerByPhoneNumberUseCase } from '@/use-cases/factories/customer/make-find-customer-by-phone-number-use-case';
import { makeSaveCustomerUseCase } from '@/use-cases/factories/customer/make-save-customer-use-case';
import { makeSelectAvailableTimeUseCase } from '@/use-cases/factories/steps/make-available-time-use-case';
import { makeSelectBarberUseCase } from '@/use-cases/factories/steps/make-select-barber-use-case';
import { makeSelectBarbershopUseCase } from '@/use-cases/factories/steps/make-select-barbershop-use-case';
import { makeSelectServiceUseCase } from '@/use-cases/factories/steps/make-select-service-use-case';
import { makeSendConfirmationAppointmentUseCase } from '@/use-cases/factories/steps/make-send-confirmation-appointment-use-case';
import { makeSendThankYouMessageUseCase } from '@/use-cases/factories/steps/make-send-thank-you-message-use-case';
import { makeSendWelcomeMessageUseCase } from '@/use-cases/factories/steps/make-send-welcome-message-use-case';
import { makeMarkIncomingMessageAsReadUseCase } from '@/use-cases/factories/whatsapp/make-mark-incoming-message-as-read-use-case';
import { fixBrazilPhoneNumber } from '@/utils/fix-brazil-phone-number';
import { getMinutesDifferenceBetweenDates } from '@/utils/get-minutes-difference-between-dates';

export async function receiveMessage(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  // console.log(
  //   'Incoming webhook message:',
  //   JSON.stringify(request.body, null, 2),
  // );

  const findCustomerByPhoneNumberUseCase =
    makeFindCustomerByPhoneNumberUseCase();
  const saveCustomerUseCase = makeSaveCustomerUseCase();

  const markIncomingMessageAsReadUseCase =
    makeMarkIncomingMessageAsReadUseCase();

  const sendWelcomeMessageUseCase = makeSendWelcomeMessageUseCase();
  // Step 1
  const selectBarbershopUseCase = makeSelectBarbershopUseCase();
  // Step 2
  const selectBarberUseCase = makeSelectBarberUseCase();
  // Step 3
  const selectServiceUseCase = makeSelectServiceUseCase();
  // Step 4
  const selectAvailableTimeUseCase = makeSelectAvailableTimeUseCase();
  // Step 5
  const sendConfirmationAppointmentUseCase =
    makeSendConfirmationAppointmentUseCase();
  // Step 6
  const sendThankYouMessageUseCase = makeSendThankYouMessageUseCase();

  const whatsAppBusinessAPIData =
    request.body as WhatsAppBusinessMessageReceivedPayload;

  const changesValue = whatsAppBusinessAPIData?.entry?.[0]?.changes?.[0]?.value;
  const businessPhoneNumberId = changesValue?.metadata?.phone_number_id;
  const customerName = changesValue?.contacts?.[0]?.profile?.name;
  const message = changesValue?.messages?.[0];

  const customer = message?.from
    ? await findCustomerByPhoneNumberUseCase.execute({
        phoneNumber: fixBrazilPhoneNumber(message.from),
      })
    : null;

  if (!customer && message?.from) {
    const customerCreated = await saveCustomerUseCase.execute({
      data: {
        name: customerName || 'Unknown user',
        phone_number: fixBrazilPhoneNumber(message.from),
        step: 0,
      },
    });

    await sendWelcomeMessageUseCase.execute({ whatsAppBusinessAPIData });

    // Step 1 - Select barbershop
    await selectBarbershopUseCase.execute({
      customer: customerCreated,
      whatsAppBusinessAPIData,
    });

    return reply.status(200).send();
  }

  // Check last interaction
  if (customer) {
    const startDate = new Date(customer?.updated_at);
    const endDate = new Date();

    if (getMinutesDifferenceBetweenDates(startDate, endDate) > 5) {
      await sendWelcomeMessageUseCase.execute({ whatsAppBusinessAPIData });

      // Step 1 - Select barbershop
      await selectBarbershopUseCase.execute({
        customer,
        whatsAppBusinessAPIData,
      });

      return reply.status(200).send();
    }
  }

  if (message?.from) {
    await markIncomingMessageAsReadUseCase.execute({
      businessPhoneNumberId,
      messageId: message.id,
    });
  }

  if (message?.type === 'text') {
    if (customer?.step === 3) {
      // Step 4 - Select available time
      await selectAvailableTimeUseCase.execute({
        customer,
        whatsAppBusinessAPIData,
      });
      return reply.status(200).send();
    }

    if (customer?.step === 4) {
      // Step 5 - Send confirmation appointment
      await sendConfirmationAppointmentUseCase.execute({
        customer,
        whatsAppBusinessAPIData,
      });
      return reply.status(200).send();
    }

    if (customer?.step === 6) {
      // Restart flow
      await sendWelcomeMessageUseCase.execute({ whatsAppBusinessAPIData });

      // Step 1 - Select barbershop
      await selectBarbershopUseCase.execute({
        customer,
        whatsAppBusinessAPIData,
      });
      return reply.status(200).send();
    }
  }

  if (
    message?.type === 'interactive' &&
    message?.interactive?.type === 'button_reply'
  ) {
    if (customer?.step === 2) {
      // Step 3 - Select service
      await selectServiceUseCase.execute({
        customer,
        whatsAppBusinessAPIData,
      });
      return reply.status(200).send();
    }

    if (customer?.step === 5) {
      // Step 6 - Send thank you message
      await sendThankYouMessageUseCase.execute({
        customer,
        whatsAppBusinessAPIData,
      });
      return reply.status(200).send();
    }
  }

  if (
    message?.type === 'interactive' &&
    message?.interactive?.type === 'list_reply'
  ) {
    if (customer?.step === 1) {
      // Step 2 - Select barber
      await selectBarberUseCase.execute({
        customer,
        whatsAppBusinessAPIData,
      });
      return reply.status(200).send();
    }
  }

  return reply.status(200).send();
}
