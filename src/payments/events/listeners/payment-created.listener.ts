import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PaymentCreatedEvent } from '../impls/payment-created.event';
import { CommandBus } from '@nestjs/cqrs';
import { CreatePaymentCommand } from '@/payments/commands/impls/create-payment.command';
import { CreatePaymentDto } from '@/payments/dto/create-payment.dto';

@Injectable()
export class PaymentCreatedListener {
  constructor(public readonly command: CommandBus) {}

  @OnEvent('payment.created', { async: true, promisify: true })
  async handleOrderCreatedEvent(event: PaymentCreatedEvent) {
    return await this.command.execute(
      new CreatePaymentCommand(event.createPaymentDto),
    );
  }
}
