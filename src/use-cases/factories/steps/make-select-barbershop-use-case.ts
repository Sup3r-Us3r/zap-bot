import { SelectBarbershopUseCase } from '@/use-cases/steps/select-barbershop';

export function makeSelectBarbershopUseCase() {
  const useCase = new SelectBarbershopUseCase();

  return useCase;
}
