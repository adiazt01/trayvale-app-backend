import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreatePaymentCommand } from "../impls/create-payment.command";
import { InjectRepository } from "@nestjs/typeorm";
import { Payment } from "@/payments/entities/payment.entity";
import { Repository } from "typeorm";

@CommandHandler(CreatePaymentCommand)
export class CreatePaymentHandler implements ICommandHandler<CreatePaymentCommand> {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async execute(command: CreatePaymentCommand) {
    const { createPaymentDto } = command;

    const payment = this.paymentRepository.create(createPaymentDto);
    
    return this.paymentRepository.save(payment);
  }
}