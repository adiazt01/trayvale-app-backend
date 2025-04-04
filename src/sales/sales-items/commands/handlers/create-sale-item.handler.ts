import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateSaleItemCommand } from "../impls/create-sale-item.command";
import { InjectRepository } from "@nestjs/typeorm";
import { SaleItem } from "../../entities/sales-item.entity";
import { Repository } from "typeorm";

@CommandHandler(CreateSaleItemCommand)
export class CreateSaleItemHandler implements ICommandHandler<CreateSaleItemCommand> {
  constructor(
    @InjectRepository(SaleItem)
    private readonly saleItemRepository: Repository<SaleItem>,
  ) { }

  async execute(command: CreateSaleItemCommand) {
    const { createSaleItemDto } = command;
    const { productId, quantity, saleId } = createSaleItemDto;

    // const saleItem = this.saleItemRepository.create({
    //   product: { 
    //     id: productId
    //   },
    //   sale: {
    //     id: saleId
    //   },
    //   quantity: quantity,
    //   unitPrice: price,
    //   totalPrice: price * quantity
    // })

    // return await this.saleItemRepository.save(saleItem);
  }
}