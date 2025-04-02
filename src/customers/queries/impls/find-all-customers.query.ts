import { Customer } from "@/customers/entities/customer";
import { Query } from "@nestjs/cqrs";

export class FindAllCustomersQuery extends Query<Customer[]> {
    constructor() 
    {super()}
}
