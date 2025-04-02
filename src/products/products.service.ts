import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProductCommand } from './commands/impls/create-product.command';
import { FindAllProductsQuery } from './queries/impls/find-all-products.query';
import { FindOneProductQuery } from './queries/impls/find-one-product.query';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);
  
  constructor (
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      this.logger.log('Creating product');

      const command = this.commandBus.execute(
        new CreateProductCommand(createProductDto),
      );

      this.logger.log('Product created successfully');

      return command;
    } catch (error) {
      this.logger.error('Error creating product', error);
      
      throw new InternalServerErrorException(
        'Error creating product',
      );
    }
  }

  async findAll() {
    try {
      const products = await this.queryBus.execute(
        new FindAllProductsQuery(),
      );

      return products;
    } catch (error) {
      this.logger.error('Error fetching products', error);

      throw new InternalServerErrorException(
        'Error fetching products',
      );
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.queryBus.execute(
        new FindOneProductQuery(id),
      );

      if (!product) {
        throw new NotFoundException(
          `Product with id ${id} not found`,
        );
      }

      return product;
    } catch (error) {
      this.logger.error('Error fetching product', error); 

      throw new InternalServerErrorException(
        'Error fetching product',
      );
    }
  }

  // TODO: Implement update method
  update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  // TODO: Implement remove method
  remove(id: string) {
    return `This action removes a #${id} product`;
  }
}
