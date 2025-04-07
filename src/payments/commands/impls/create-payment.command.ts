import { CreatePaymentDto } from "@/payments/dto/create-payment.dto";
import { Payment } from "@/payments/entities/payment.entity";
import { Command } from "@nestjs/cqrs";

export class CreatePaymentCommand extends Command<Payment> {
    constructor(
        public readonly createPaymentDto: CreatePaymentDto,
    ) {
        super();
    }
    
}