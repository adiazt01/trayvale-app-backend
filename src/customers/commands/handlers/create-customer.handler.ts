import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCustomerCommand } from '../impls/create-customer.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '@/customers/entities/customer';
import { Repository } from 'typeorm';

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerHandler
  implements ICommandHandler<CreateCustomerCommand>
{
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async execute(command: CreateCustomerCommand) {
    const { createCustomerDto } = command;
    const { fullName, nickname, phone } = createCustomerDto;

    const customer = this.customerRepository.create({
      fullName,
      nickname,
      phone,
    });

    await this.customerRepository.save(customer);

    return customer;
  }
}
