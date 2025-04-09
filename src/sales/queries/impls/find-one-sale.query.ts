import { Sale } from '@/sales/entities/sale.entity';
import { Query } from '@nestjs/cqrs';

export class FindOneSaleQuery extends Query<Sale> {
  constructor(public readonly id: string) {
    super();
  }
}
