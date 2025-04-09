import { IsArray, IsNotEmpty } from 'class-validator';
import { PaginationMetadataDto } from './pagination-metadata.dto';

export class PaginationResultDto<T> {
  @IsArray()
  readonly data: T[];

  @IsNotEmpty()
  readonly meta: PaginationMetadataDto;

  constructor(data: T[], meta: PaginationMetadataDto) {
    this.data = data;
    this.meta = meta;
  }
}
