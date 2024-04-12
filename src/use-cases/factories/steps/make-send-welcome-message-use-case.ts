import { SendWelcomeMessageUseCase } from '@/use-cases/steps/send-welcome-message';

export function makeSendWelcomeMessageUseCase() {
  const useCase = new SendWelcomeMessageUseCase();

  return useCase;
}
