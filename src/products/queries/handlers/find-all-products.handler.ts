import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindAllProductsQuery } from "../impls/find-all-products.query";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "@/products/entities/product.entity";
import { Repository } from "typeorm";

@QueryHandler(FindAllProductsQuery)
export class FindAllProductsHandler implements IQueryHandler<FindAllProductsQuery> {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async execute(query: FindAllProductsQuery) {
    const {  } = query;
    const products = await this.productRepository.find();
    return products;
  }
}
