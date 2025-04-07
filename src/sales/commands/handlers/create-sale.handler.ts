import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateSaleCommand } from "../impls/create-sale.command";
import { InjectRepository } from "@nestjs/typeorm";
import { Sale } from "@/sales/entities/sale.entity";
import { Repository } from "typeorm";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { PaymentCreatedEvent } from "@/payments/events/impls/payment-created.event";
import { Payment } from "@/payments/entities/payment.entity";

@CommandHandler(CreateSaleCommand)
export class CreateSaleHandler implements ICommandHandler<CreateSaleCommand> {
    constructor(
        @InjectRepository(Sale)
        private readonly saleRepository: Repository<Sale>,
        private eventEmitter: EventEmitter2,
    ) { }

    async execute(command: CreateSaleCommand) {
        const { createSaleDto } = command;
        const { payment, saleItems } = createSaleDto;

        const paymentResult: Payment[] = await this.eventEmitter.emitAsync(
            'payment.created',
            new PaymentCreatedEvent({
                method: payment.method,
                amount: saleItems.reduce((total, item) => total + (item.price * item.quantity), 0),
                status: payment.status,
                transactionId: payment.transactionId,
                saleId: null,
            })
        );

        const sale = this.saleRepository.create({
            payment: {
                id: paymentResult[0].id,
            },
            saleItems: saleItems.map(saleItem => ({
                quantity: saleItem.quantity,
                price: saleItem.price,
                totalPrice: saleItem.totalPrice,
                product: {
                    id: saleItem.productId,
                },
            })),
        });

        return await this.saleRepository.save(sale);
    }
}