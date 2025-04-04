import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateProductCommand } from "../impls/update-product.command";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "@/products/entities/product.entity";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler implements ICommandHandler<UpdateProductCommand> {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    async execute(command: UpdateProductCommand) {
        const { id, updateProductDto } = command;

        const productUpdate = await this.productRepository.preload({
            id,
            ...updateProductDto,
        });

        if (!productUpdate) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }

        return productUpdate;
    }
}