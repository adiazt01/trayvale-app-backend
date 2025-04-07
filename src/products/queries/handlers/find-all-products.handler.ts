import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindAllProductsQuery } from "../impls/find-all-products.query";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "@/products/entities/product.entity";
import { Repository } from "typeorm";
import { createPaginationResult, getSkip } from "@/common/helpers/pagination.helpers";
import { Order } from "@/common/enum/order.enum";

@QueryHandler(FindAllProductsQuery)
export class FindAllProductsHandler implements IQueryHandler<FindAllProductsQuery> {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  async execute(query: FindAllProductsQuery) {
    const { paginationProductsOptionsDto } = query;
    const { limit = 10, page = 1, order = Order.ASC } = paginationProductsOptionsDto;

    const skip = getSkip(page, limit);

    const queryBuilder = this.productRepository
      .createQueryBuilder("product");

    queryBuilder
      .orderBy("product.createdAt", order)
      .skip(skip)
      .take(limit);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    console.log(entities)

    return createPaginationResult(entities, itemCount, paginationProductsOptionsDto);
  }
}
