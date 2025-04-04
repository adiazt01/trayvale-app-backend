import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateSaleCommand } from "../impls/create-sale.command";
import { InjectRepository } from "@nestjs/typeorm";
import { Sale } from "@/sales/entities/sale.entity";
import { Repository } from "typeorm";

@CommandHandler(CreateSaleCommand)
export class CreateSaleHandler implements ICommandHandler<CreateSaleCommand> {
    constructor(
        @InjectRepository(Sale)
        private readonly saleRepository: Repository<Sale>,
    ) { }

    async execute(command: CreateSaleCommand) {
        const { createSaleDto } = command;
        const { payment, saleItems } = createSaleDto;

        const sale = this.saleRepository.create({
            payment: {
                amount: saleItems.reduce((total, item) => total + (item.price * item.quantity), 0),
                method: payment.method,
                status: payment.status,
            },
            saleItems: saleItems.map(saleItem => ({
                productId: saleItem.productId,
                quantity: saleItem.quantity,
                price: saleItem.price,
                totalPrice: saleItem.totalPrice,
            })),
        });

        return await this.saleRepository.save(sale);
    }
}