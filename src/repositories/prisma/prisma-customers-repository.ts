import { prisma } from '@/lib/prisma';
import { Customer } from '@prisma/client';

import type { ICustomersRepository } from '../customers-repository';

export class PrismaCustomersRepository implements ICustomersRepository {
  async findByPhoneNumber(phoneNumber: string): Promise<Customer | null> {
    const customer = await prisma.customer.findUnique({
      where: {
        phone_number: phoneNumber,
      },
    });

    return customer;
  }

  async save(data: Customer): Promise<Customer> {
    const response = await prisma.customer.upsert({
      where: {
        phone_number: data.phone_number,
      },
      create: data,
      update: data,
    });

    return response;
  }
}
