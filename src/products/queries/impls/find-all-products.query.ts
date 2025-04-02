import { PaginationOptionsDto } from "@/common/dtos/pagination-options.dto";
import { PaginationResultDto } from "@/common/dtos/pagination-result.dto";
import { Product } from "@/products/entities/product.entity";
import { Query } from "@nestjs/cqrs";

export class FindAllProductsQuery extends Query<PaginationResultDto<Product>> {
    constructor(
        public readonly paginationOptionsDto: PaginationOptionsDto
    ) { super() }
}
