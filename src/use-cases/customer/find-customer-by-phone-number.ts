import { ICustomersRepository } from '@/repositories/customers-repository';
import { Customer } from '@prisma/client';

type FindCustomerByPhoneNumberUseCaseInput = {
  phoneNumber: string;
};

type FindCustomerByPhoneNumberUseCaseOutput = Promise<Customer | null>;

export class FindCustomerByPhoneNumberUseCase {
  constructor(private customersRepository: ICustomersRepository) {}

  async execute({
    phoneNumber,
  }: FindCustomerByPhoneNumberUseCaseInput): FindCustomerByPhoneNumberUseCaseOutput {
    return await this.customersRepository.findByPhoneNumber(phoneNumber);
  }
}
