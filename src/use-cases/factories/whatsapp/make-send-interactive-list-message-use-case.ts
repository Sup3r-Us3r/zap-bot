import { SendInteractiveListMessageUseCase } from '../../whatsapp/send-interactive-list-message';

export function makeSendInteractiveListMessageUseCase() {
  const useCase = new SendInteractiveListMessageUseCase();

  return useCase;
}
