import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { paymentsListeners } from './events/listeners';
import { paymentsCommandsHandlers } from './commands/handlers';

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    ...paymentsListeners,
    ...paymentsCommandsHandlers,
  ],
  exports: [PaymentsService, TypeOrmModule],
})
export class PaymentsModule {}
