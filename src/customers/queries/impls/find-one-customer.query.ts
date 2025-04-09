import { Customer } from '@/customers/entities/customer';
import { Query } from '@nestjs/cqrs';

export class FindOneCustomerQuery extends Query<Customer | null> {
  constructor(public readonly id: number) {
    super();
  }
}
