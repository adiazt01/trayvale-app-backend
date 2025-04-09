import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { commandsHandlers } from './commands/handlers';
import { queriesHandlers } from './queries/handlers';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { Customer } from './entities/customer';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Customer])],
  controllers: [CustomersController],
  providers: [CustomersService, ...commandsHandlers, ...queriesHandlers],
  exports: [CustomersService, TypeOrmModule],
})
export class CustomersModule {}
