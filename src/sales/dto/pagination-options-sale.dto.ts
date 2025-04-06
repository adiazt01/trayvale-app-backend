import { PaginationOptionsDto } from "@/common/dtos/pagination-options.dto";
import { IntersectionType } from "@nestjs/mapped-types";

export class PaginationSaleOptionsDto extends IntersectionType(
    PaginationOptionsDto) {
}