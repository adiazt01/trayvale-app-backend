import { PartialType } from '@nestjs/mapped-types';
import { CreateSalesItemDto } from './create-sale-item.dto';

export class UpdateSalesItemDto extends PartialType(CreateSalesItemDto) {}
