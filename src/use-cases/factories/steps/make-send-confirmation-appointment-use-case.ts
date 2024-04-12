import { SendConfirmationAppointmentUseCase } from '@/use-cases/steps/send-confirmation-appointment';

export function makeSendConfirmationAppointmentUseCase() {
  const useCase = new SendConfirmationAppointmentUseCase();

  return useCase;
}
