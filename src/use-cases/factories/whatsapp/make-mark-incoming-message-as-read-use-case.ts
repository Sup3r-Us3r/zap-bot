import { MarkIncomingMessageAsReadUseCase } from '../../whatsapp/mark-incoming-message-as-read';

export function makeMarkIncomingMessageAsReadUseCase() {
  const useCase = new MarkIncomingMessageAsReadUseCase();

  return useCase;
}
