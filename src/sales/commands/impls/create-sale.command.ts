import { Product } from '@/products/entities/product.entity';
import { CreateSaleDto } from '@/sales/dto/create-sale.dto';
import { Sale } from '@/sales/entities/sale.entity';
import { Command } from '@nestjs/cqrs';

export class CreateSaleCommand extends Command<any> {
  constructor(
    public readonly createSaleDto: CreateSaleDto,
    public readonly products: Product[],
  ) {
    super();
  }
}
