import { ICustomersRepository } from '@/repositories/customers-repository';
import { Customer } from '@prisma/client';

type SaveCustomerUseCaseInput = {
  data: Partial<Customer>;
};

type SaveCustomerUseCaseOutput = Promise<Customer>;

export class SaveCustomerUseCase {
  constructor(private customersRepository: ICustomersRepository) {}

  async execute({ data }: SaveCustomerUseCaseInput): SaveCustomerUseCaseOutput {
    return await this.customersRepository.save(data as Customer);
  }
}
