import { Customer } from '@/customers/entities/customer';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOneCustomerQuery } from '../impls/find-one-customer.query';

@QueryHandler(FindOneCustomerQuery)
export class FindOneCustomerHandler
  implements IQueryHandler<FindOneCustomerQuery>
{
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async execute(query: FindOneCustomerQuery) {
    const { id } = query;

    const customer = await this.customerRepository.findOne({
      where: { id },
    });

    if (!customer) {
      return null;
    }

    return customer;
  }
}
