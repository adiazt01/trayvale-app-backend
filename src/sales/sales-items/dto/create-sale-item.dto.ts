import { IsNumber, Min } from "class-validator";

export class CreateSaleItemDto {
    @IsNumber()
    @Min(1)
    productId: number;

    @IsNumber()
    @Min(1)
    quantity: number;

    @IsNumber()
    @Min(0)
    price: number;
}
