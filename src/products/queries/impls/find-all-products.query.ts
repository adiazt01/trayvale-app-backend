import { PaginationResultDto } from "@/common/dtos/pagination-result.dto";
import { PaginationProductOptionsDto } from "@/products/dto/pagination-product-options.dto";
import { Product } from "@/products/entities/product.entity";
import { Query } from "@nestjs/cqrs";

export class FindAllProductsQuery extends Query<PaginationResultDto<Product>> {
    constructor(
        public readonly paginationProductsOptionsDto: PaginationProductOptionsDto
    ) { super() }
}
