import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCustomerCommand } from './commands/impls/create-customer.command';
import { FindAllCustomersQuery } from './queries/impls/find-all-customers.query';
import { FindOneCustomerQuery } from './queries/impls/find-one-customer.query';

@Injectable()
export class CustomersService {
  private readonly logger = new Logger(CustomersService.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async create(createCostumerDto: CreateCustomerDto) {
    try {
      this.logger.log('Creating customer');

      const customer = await this.commandBus.execute(
        new CreateCustomerCommand(createCostumerDto),
      );

      this.logger.log('Customer created successfully', customer.fullName);

      return customer;
    } catch (error) {
      this.logger.error('Error creating customer', error);
      throw new InternalServerErrorException('Error creating customer');
    }
  }

  async findAll() {
    try {
      const customers = await this.queryBus.execute(
        new FindAllCustomersQuery(),
      );

      return customers;
    } catch (error) {
      this.logger.error('Error fetching all customers', error);
      throw new InternalServerErrorException('Error fetching all customers');
    }
  }

  async findOne(id: number) {
    try {
      const customer = await this.queryBus.execute(
        new FindOneCustomerQuery(id),
      );

      return customer;
    } catch (error) {
      this.logger.error('Error fetching customer', error);
      throw new InternalServerErrorException('Error fetching customer');
    }
  }

  // TODO: Implement update
  update(id: number, updateCostumerDto: UpdateCustomerDto) {
    return `This action updates a #${id} costumer`;
  }

  // TODO: Implement remove
  remove(id: number) {
    return `This action removes a #${id} costumer`;
  }
}
