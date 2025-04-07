import { IsArray, IsNumber, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateSaleItemDto } from "../sales-items/dto/create-sale-item.dto";
import { CreatePaymentDto } from "@/payments/dto/create-payment.dto";
import { PickType } from "@nestjs/mapped-types";

export class PaymentInSaleDto extends PickType(CreatePaymentDto, [
    "method",
    "status",
    "transactionId",
] as const) {
}

export class CreateSaleItemInSaleDto extends PickType(CreateSaleItemDto, [
    "productId",
    "quantity",
] as const) {
    @IsOptional()
    @Type(() => Number)
    @IsNumber({
        maxDecimalPlaces: 2,
    })
    price: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber({
        maxDecimalPlaces: 2,
    })
    totalPrice: number;
}


export class CreateSaleDto {
    @IsArray({ message: "Sale items must be an array" })
    @ValidateNested({ each: true })
    @Type(() => CreateSaleItemInSaleDto)
    saleItems: CreateSaleItemInSaleDto[];

    @Type(() => PaymentInSaleDto)
    @ValidateNested()
    payment: PaymentInSaleDto;
}