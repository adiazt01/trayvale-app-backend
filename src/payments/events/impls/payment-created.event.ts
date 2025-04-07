import { CreatePaymentDto } from "../../dto/create-payment.dto";

export class PaymentCreatedEvent {
    constructor (
        public createPaymentDto: CreatePaymentDto
    ) {}
}