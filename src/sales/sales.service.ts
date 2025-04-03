import { Injectable, Logger } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sale } from './entities/sale.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Injectable()
export class SalesService {
  private readonly logger = new Logger(SalesService.name);

  constructor (
    private readonly command: CommandBus,
    private readonly query: QueryBus,
  ) {}

  async create(createSaleDto: CreateSaleDto): Promise<Sale> {
    this.logger.log('Creating sale', createSaleDto);
    // Create the sale
    // Register items sales
    // Emit event for generate a invoice
    try {
      const sale = await this.command.execute(
        new CreateSaleCommand(createSaleDto),
      );

      
      this.logger.log('Sale created successfully', sale);

      return sale;
    } catch (error) {
      this.logger.error('Error creating sale', error);
      throw new Error('Error creating sale');
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
