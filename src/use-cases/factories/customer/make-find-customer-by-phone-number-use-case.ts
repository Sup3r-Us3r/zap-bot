import { PrismaCustomersRepository } from '@/repositories/prisma/prisma-customers-repository';

import { FindCustomerByPhoneNumberUseCase } from '../../customer/find-customer-by-phone-number';

export function makeFindCustomerByPhoneNumberUseCase() {
  const customersRepository = new PrismaCustomersRepository();
  const useCase = new FindCustomerByPhoneNumberUseCase(customersRepository);

  return useCase;
}
