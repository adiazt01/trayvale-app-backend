import { IsArray, IsNumber, Min, ValidateNested } from "class-validator";
import { SaleItem } from "../sales-items/entities/sales-item.entity";
import { Type } from "class-transformer";
import { CreateSaleItemDto } from "../sales-items/dto/create-sale-item.dto";
import { CreatePaymentDto } from "@/payments/dto/create-payment.dto";

export class CreateSaleDto {
    @IsArray({ message: "Sale items must be an array" })
    @ValidateNested({ each: true })
    @Type(() => CreateSaleItemDto)
    saleItems: CreateSaleItemDto[];

    @ValidateNested()
    @Type(() => CreatePaymentDto)
    payment: CreatePaymentDto;
}
