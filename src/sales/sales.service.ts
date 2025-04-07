import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateSaleCommand } from './commands/impls/create-sale.command';
import { ProductsService } from '@/products/products.service';
import { calculateSalePrices } from './utils/sales.utils';
import { PaginationSaleOptionsDto } from './dto/pagination-options-sale.dto';
import { FindAllSalesQuery } from './queries/impls/find-all-sales.query';
import { FindOneSaleQuery } from './queries/impls/find-one-sale.query';

@Injectable()
export class SalesService {
  private readonly logger = new Logger(SalesService.name);

  constructor(
    private readonly command: CommandBus,
    private readonly query: QueryBus,
    private readonly productsService: ProductsService,
  ) { }

  async create(createSaleDto: CreateSaleDto) {
    this.logger.log('Creating sale', createSaleDto);

    try {
      const productsFound = await this.productsService.validateProducts({
        uuids: createSaleDto.saleItems.map((item) => item.productId),
      })

      calculateSalePrices(createSaleDto, productsFound);

      const sale = await this.command.execute(
        new CreateSaleCommand(createSaleDto, productsFound),
      );

      this.logger.log('Sale created successfully', sale);

      return sale;
    } catch (error) {
      this.logger.error('Error creating sale', error);
      throw new InternalServerErrorException(
        'Error creating sale',
        error,
      );
    }
  }

  async findAll(paginationSaleOptionsDto: PaginationSaleOptionsDto) {
    try {
      const sales = await this.query.execute(
        new FindAllSalesQuery(paginationSaleOptionsDto),
      );

      return sales;
    } catch (error) {
      this.logger.error('Error finding sales', error);
      throw new InternalServerErrorException(
        'Error finding sales',
        error,
      );
    }
  }

  async findOne(id: string) {
    try {
      const sale = await this.query.execute(
        new FindOneSaleQuery(id),
      );

      if (!sale) {
        throw new NotFoundException(`Sale with id ${id} not found`);
      }

      return sale;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Error finding sale',
        error
      )
    }
  }

  update(id: string, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: string) {
    return `This action removes a #${id} sale`;
  }
}
