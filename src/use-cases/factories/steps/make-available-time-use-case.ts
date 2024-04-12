import { SelectAvailableTimeUseCase } from '@/use-cases/steps/select-available-time';

export function makeSelectAvailableTimeUseCase() {
  const useCase = new SelectAvailableTimeUseCase();

  return useCase;
}
