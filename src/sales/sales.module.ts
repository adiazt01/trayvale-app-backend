import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { SalesItemsModule } from './sales-items/sales-items.module';
import { CqrsModule } from '@nestjs/cqrs';
import { commandsHandlers } from './commands/handlers';
import { queriesHandlers } from './queries/handlers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      Sale
    ]),
    ...commandsHandlers,
    ...queriesHandlers,
    SalesItemsModule
  ],
  controllers: [SalesController],
  providers: [SalesService],
  exports: [SalesService, TypeOrmModule],
})
export class SalesModule {}
