import { CreateCustomerDto } from "@/customers/dto/create-customer.dto";
import { Customer } from "@/customers/entities/customer";
import { Command } from "@nestjs/cqrs";

export class CreateCustomerCommand extends Command<Customer> {
    constructor(
        public readonly createCustomerDto: CreateCustomerDto
    ) {
        super();
    }
}