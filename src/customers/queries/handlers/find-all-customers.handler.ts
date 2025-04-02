import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindAllCustomersQuery } from "../impls/find-all-customers.query";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "@/customers/entities/customer";
import { Repository } from "typeorm";

@QueryHandler(FindAllCustomersQuery)
export class FindAllCustomersHandler implements IQueryHandler<FindAllCustomersQuery> {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async execute(query: FindAllCustomersQuery) {
    const {  } = query;

    const customers = await this.customerRepository.find();

    return customers;
  }
}
