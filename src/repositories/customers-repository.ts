import { Customer } from '@prisma/client';

export interface ICustomersRepository {
  findByPhoneNumber: (phoneNumber: string) => Promise<Customer | null>;
  save: (data: Customer) => Promise<Customer>;
}
