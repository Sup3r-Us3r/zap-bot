import { SelectBarberUseCase } from '@/use-cases/steps/select-barber';

export function makeSelectBarberUseCase() {
  const useCase = new SelectBarberUseCase();

  return useCase;
}
