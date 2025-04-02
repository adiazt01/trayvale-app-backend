import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindAllProductsQuery } from "../impls/find-all-products.query";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "@/products/entities/product.entity";
import { Repository } from "typeorm";
import { PaginationMetadataDto } from "@/common/dtos/pagination-metadata.dto";
import { PaginationResultDto } from "@/common/dtos/pagination-result.dto";

@QueryHandler(FindAllProductsQuery)
export class FindAllProductsHandler implements IQueryHandler<FindAllProductsQuery> {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  async execute(query: FindAllProductsQuery) {
    const { paginationOptionsDto } = query;

    const queryBuilder = this.productRepository
      .createQueryBuilder("product");

    queryBuilder
      .orderBy("product.createdAt", paginationOptionsDto.order)
      .skip(paginationOptionsDto.skip)
      .take(paginationOptionsDto.limit);


    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const paginationMetaData = new PaginationMetadataDto({
      itemCount,
      paginationOptionsDto,
    })

    return new PaginationResultDto(entities, paginationMetaData)
  }
}
