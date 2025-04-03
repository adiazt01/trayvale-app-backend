import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateSalesItemDto } from './dto/create-sale-item.dto';
import { UpdateSalesItemDto } from './dto/update-sale-item.dto';
import { CommandBus, Query, QueryBus } from '@nestjs/cqrs';
import { PaginationOptionsDto } from '@/common/dtos/pagination-options.dto';
import { PaginationResultDto } from '@/common/dtos/pagination-result.dto';
import { SaleItem } from './entities/sales-item.entity';
import { CreateSaleItemCommand } from './commands/impls/create-sale-item.command';

@Injectable()
export class SalesItemsService {
  private readonly logger = new Logger(SalesItemsService.name);

  constructor(
    private readonly command: CommandBus,
    private readonly query: QueryBus,
  ) { }

  async create(createSalesItemDto: CreateSalesItemDto | CreateSalesItemDto[]): Promise<SaleItem | SaleItem[]> {
    try {
      if (Array.isArray(createSalesItemDto)) {
        const saleItems = await Promise.all(
          createSalesItemDto.map(dto =>
            this.command.execute(new CreateSaleItemCommand(dto)),
          ),
        );
        return saleItems;
      } else {
        const saleItem = await this.command.execute(
          new CreateSaleItemCommand(createSalesItemDto),
        );
        return saleItem;
      }
    } catch (error) {
      this.logger.error('Error creating sales item(s)', error);
      throw new InternalServerErrorException('Error creating sales item(s)');
    }
  }

  async findAll(paginationOptions:PaginationOptionsDto): Promise<PaginationResultDto<SaleItem>> {
    try {
      const salesItems = await this.query.execute(
        new FindAllSalesItemsQuery(paginationOptions),
      );

      return salesItems;
    } catch (error) {
      this.logger.error('Error finding all sales items', error);
      throw new InternalServerErrorException('Error finding all sales items');
    }
  }

  async findOne(id: number): Promise<SaleItem> {
    try {
      const saleItem = await this.query.execute(
        new FindOneSalesItemQuery(id),
      );

      return saleItem;
    } catch (error) {
      this.logger.error(`Error finding sales item with id ${id}`, error);
      throw new InternalServerErrorException(`Error finding sales item with id ${id}`);
    }
  }

  async update(id: number, updateSalesItemDto: UpdateSalesItemDto): Promise<SaleItem> {
    try { 
      await this.findOne(id);

      const saleItem = await this.command.execute(
        new UpdateSalesItemCommand(id, updateSalesItemDto),
      );

      return saleItem;
    } catch (error) {
      this.logger.error(`Error updating sales item with id ${id}`, error);
      throw new InternalServerErrorException(`Error updating sales item with id ${id}`);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.findOne(id);

      await this.command.execute(
        new DeleteSalesItemCommand(id),
      );
    } catch (error) {
      this.logger.error(`Error deleting sales item with id ${id}`, error);
      throw new InternalServerErrorException(`Error deleting sales item with id ${id}`);
    }
  }
}
