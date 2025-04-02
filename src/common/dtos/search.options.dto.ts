import { IsOptional } from "class-validator";

export class SearchOptionsDto {
  @IsOptional()
  search?: string;

  @IsOptional()
  sortBy?: string;

  @IsOptional()
  sortOrder?: 'asc' | 'desc';
}