import { PaginationOptionsDto } from "../dtos/pagination-options.dto";

export interface PaginationMetadataParameters {
  paginationOptionsDto: PaginationOptionsDto;
  itemCount: number;
}