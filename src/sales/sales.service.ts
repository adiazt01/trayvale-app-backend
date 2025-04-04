import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateSaleCommand } from './commands/impls/create-sale.command';
import { ProductsService } from '@/products/products.service';
import { calculateSalePrices } from './utils/sales.utils';

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

  findAll() {
    return `This action returns all sales`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sale`;
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
