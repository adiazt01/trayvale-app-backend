import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, IsUUID, Min } from "class-validator";

export class CreateSaleItemDto {
    @IsUUID('4')
    productId: string;

    @IsUUID('4')
    saleId: string;

    @Type(() => Number)
    @IsNumber()
    @Min(1)
    quantity: number;
}
