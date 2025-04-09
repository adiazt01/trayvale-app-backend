import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { SalesItemsModule } from './sales-items/sales-items.module';
import { CqrsModule } from '@nestjs/cqrs';
import { commandsHandlers } from './commands/handlers';
import { queriesHandlers } from './queries/handlers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { ProductsService } from '@/products/products.service';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Sale]), SalesItemsModule],
  controllers: [SalesController],
  providers: [
    SalesService,
    ProductsService,
    ...commandsHandlers,
    ...queriesHandlers,
  ],
  exports: [SalesService, TypeOrmModule],
})
export class SalesModule {}
