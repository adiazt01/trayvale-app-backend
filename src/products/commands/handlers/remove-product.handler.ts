import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { RemoveProductCommand } from "../impls/remove-product.command";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "@/products/entities/product.entity";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(RemoveProductCommand)
export class RemoveProductHandler implements ICommandHandler<RemoveProductCommand> {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async execute(command: RemoveProductCommand): Promise<void> {
    const { id } = command;

    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    await this.productRepository.remove(product);
  }
}