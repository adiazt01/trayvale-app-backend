import { CreateProductDto } from "@/products/dto/create-product.dto";
import { Product } from "@/products/entities/product.entity";
import { Command } from "@nestjs/cqrs";

export class CreateProductCommand extends Command<Product> {
    constructor(
        public readonly createProductDto: CreateProductDto
    ) {
        super();
    }
}