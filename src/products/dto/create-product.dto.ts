import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @Type(() => Number)
    @IsNumber({
        maxDecimalPlaces: 2 
    })
    price: number;

    @IsString()
    name: string;

    @IsString()
    description: string;
}
