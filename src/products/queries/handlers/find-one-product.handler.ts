import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindOneProductQuery } from "../impls/find-one-product.query";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "@/products/entities/product.entity";
import { Repository } from "typeorm";

@QueryHandler(FindOneProductQuery)
export class FindOneProductHandler implements IQueryHandler<FindOneProductQuery> {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async execute(query: FindOneProductQuery) {
      const { productId } = query;
      
      const product = await this.productRepository.findOneBy({
        id: productId,
      });
      
      if (!product) {
        return null;
      }
      
      return product;
  }
}
