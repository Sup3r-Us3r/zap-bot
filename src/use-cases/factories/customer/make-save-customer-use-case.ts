import { PrismaCustomersRepository } from '@/repositories/prisma/prisma-customers-repository';

import { SaveCustomerUseCase } from '../../customer/save-customer';

export function makeSaveCustomerUseCase() {
  const customersRepository = new PrismaCustomersRepository();
  const useCase = new SaveCustomerUseCase(customersRepository);

  return useCase;
}
