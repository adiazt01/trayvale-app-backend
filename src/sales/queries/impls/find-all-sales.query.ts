import { PaginationResultDto } from "@/common/dtos/pagination-result.dto";
import { PaginationSaleOptionsDto } from "@/sales/dto/pagination-options-sale.dto";
import { Sale } from "@/sales/entities/sale.entity";
import { Query } from "@nestjs/cqrs";

export class FindAllSalesQuery extends Query<PaginationResultDto<Sale>> {
    constructor(
        public readonly paginationSaleOptionsDto: PaginationSaleOptionsDto,
    ) 
    {super()}
}
