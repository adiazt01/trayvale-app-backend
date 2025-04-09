import { Module } from '@nestjs/common';
import { SalesItemsService } from './sales-items.service';
import { SalesItemsController } from './sales-items.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { commandsHandlers } from './commands/handlers';
import { queriesHandlers } from './queries/handlers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleItem } from './entities/sales-item.entity';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([SaleItem]),
    ...commandsHandlers,
    ...queriesHandlers,
  ],
  controllers: [SalesItemsController],
  providers: [SalesItemsService],
  exports: [SalesItemsService, TypeOrmModule],
})
export class SalesItemsModule {}
