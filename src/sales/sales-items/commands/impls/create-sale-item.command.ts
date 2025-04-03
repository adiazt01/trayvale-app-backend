import { Command } from "@nestjs/cqrs";
import { SaleItem } from "../../entities/sales-item.entity";
import { CreateSalesItemDto } from "../../dto/create-sales-item.dto";

export class CreateSaleItemCommand extends Command<SaleItem> {
    constructor(
        public readonly createSaleItemDto: CreateSalesItemDto,
    ) {
        super();
    }
}