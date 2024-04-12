import { SendTextMessageUseCase } from '../../whatsapp/send-text-message';

export function makeSendTextMessageUseCase() {
  const useCase = new SendTextMessageUseCase();

  return useCase;
}
