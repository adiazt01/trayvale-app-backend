import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Order } from '../enum/order.enum';
import { Transform, Type } from 'class-transformer';

export class PaginationOptionsDto {
  @IsOptional()
  @IsEnum(Order)
  order?: Order = Order.ASC;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number = 10;

  constructor(partial: Partial<PaginationOptionsDto>) {
    Object.assign(this, partial);
  }
}
