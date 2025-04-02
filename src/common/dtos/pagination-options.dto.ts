import { IsEnum, IsInt, IsOptional, Max, Min } from "class-validator";
import { Order } from "../enum/order.enum";
import { Type } from "class-transformer";

export class PaginationOptionsDto {
    @IsEnum(Order)
    @IsOptional()
    readonly order?: Order = Order.ASC;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    @IsOptional()
    readonly page?: number = 1;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(50)
    @IsOptional()
    readonly limit?: number = 10;

    get skip(): number {
        return (this.page - 1) * this.limit;
    }
}