import { SelectServiceUseCase } from '@/use-cases/steps/select-service';

export function makeSelectServiceUseCase() {
  const useCase = new SelectServiceUseCase();

  return useCase;
}
