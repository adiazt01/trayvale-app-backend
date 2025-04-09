import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from '../impls/create-product.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '@/products/entities/product.entity';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async execute(command: CreateProductCommand) {
    const { createProductDto } = command;
    const { description, name, price } = createProductDto;

    const product = this.productRepository.create({
      description,
      name,
      price,
    });

    await this.productRepository.save(product);

    return product;
  }
}
