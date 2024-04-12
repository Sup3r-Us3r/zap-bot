import { SendInteractiveButtonMessageUseCase } from '../../whatsapp/send-interactive-button-message';

export function makeSendInteractiveButtonMessageUseCase() {
  const useCase = new SendInteractiveButtonMessageUseCase();

  return useCase;
}
