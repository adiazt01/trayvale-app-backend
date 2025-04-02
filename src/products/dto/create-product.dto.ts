import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsNumber({
        maxDecimalPlaces: 2 
    })
    @Type(() => Number)
    price: number;

    @IsString()
    name: string;

    @IsString()
    description: string;
}
