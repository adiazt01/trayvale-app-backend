import { IsBoolean, IsNotEmpty, IsNumber, IsPositive } from "class-validator";
import { PaginationMetadataParameters } from "../interface/pagination-meta-parameters.interface";

export class PaginationMetadataDto {
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    page: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    limit: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    count: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    totalPages: number;

    @IsNotEmpty()
    @IsBoolean()
    @IsPositive()
    hasPreviousPage: boolean;

    @IsNotEmpty()
    @IsBoolean()
    @IsPositive()
    hasNextPage: boolean;

    constructor({ paginationOptionsDto, itemCount }: PaginationMetadataParameters) {
        this.page = paginationOptionsDto.page;
        this.limit = paginationOptionsDto.limit;
        this.count = itemCount;
        this.totalPages = Math.ceil(itemCount / paginationOptionsDto.limit);
        this.hasPreviousPage = paginationOptionsDto.page > 1;
        this.hasNextPage = paginationOptionsDto.page < this.totalPages;
    }
}