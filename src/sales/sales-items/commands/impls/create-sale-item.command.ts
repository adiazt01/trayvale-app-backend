import { Command } from "@nestjs/cqrs";
import { SaleItem } from "../../entities/sales-item.entity";
import { CreateSaleItemDto } from "../../dto/create-sale-item.dto";

export class CreateSaleItemCommand extends Command<any> {
    constructor(
        public readonly createSaleItemDto: CreateSaleItemDto,
    ) {
        super();
    }
}