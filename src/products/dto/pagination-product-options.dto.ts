import { PaginationOptionsDto } from "@/common/dtos/pagination-options.dto";
import { IntersectionType } from "@nestjs/mapped-types";
import { IsArray, IsOptional, IsUUID } from "class-validator";

class ProductOptionsDto {
    @IsOptional()
    @IsArray()
    @IsUUID("4", { each: true })
    uuids?: string[];
}

export class PaginationProductOptionsDto extends IntersectionType(ProductOptionsDto, PaginationOptionsDto) {
}