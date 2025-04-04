import { PartialType } from '@nestjs/mapped-types';
import { CreateSaleItemDto } from './create-sale-item.dto';

export class UpdateSalesItemDto extends PartialType(CreateSaleItemDto) {}
