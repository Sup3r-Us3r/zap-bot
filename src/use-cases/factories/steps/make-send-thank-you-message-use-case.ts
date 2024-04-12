import { SendThankYouMessageUseCase } from '@/use-cases/steps/send-thank-you-message';

export function makeSendThankYouMessageUseCase() {
  const useCase = new SendThankYouMessageUseCase();

  return useCase;
}
