import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SalesItemsService } from './sales-items.service';
import { CreateSaleItemDto } from './dto/create-sale-item.dto';
import { UpdateSalesItemDto } from './dto/update-sale-item.dto';
import { PaginationOptionsDto } from '@/common/dtos/pagination-options.dto';

@Controller('sales-items')
export class SalesItemsController {
  constructor(private readonly salesItemsService: SalesItemsService) {}

  // @Post()
  // create(@Body() createSalesItemDto: CreateSalesItemDto | CreateSalesItemDto[]) {
  //   return this.salesItemsService.create(createSalesItemDto);
  // }

  // @Get()
  // findAll(@Query() paginationOptions: PaginationOptionsDto) {
  //   return this.salesItemsService.findAll(paginationOptions);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.salesItemsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSalesItemDto: UpdateSalesItemDto) {
  //   return this.salesItemsService.update(+id, updateSalesItemDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.salesItemsService.remove(+id);
  // }
}
