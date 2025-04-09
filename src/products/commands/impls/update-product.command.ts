import { UpdateProductDto } from '@/products/dto/update-product.dto';
import { Product } from '@/products/entities/product.entity';
import { Command } from '@nestjs/cqrs';

export class UpdateProductCommand extends Command<Product> {
  constructor(
    public readonly id: string,
    public readonly updateProductDto: UpdateProductDto,
  ) {
    super();
  }
}
