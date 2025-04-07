import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindOneSaleQuery } from "../impls/find-one-sale.query";
import { InjectRepository } from "@nestjs/typeorm";
import { Sale } from "@/sales/entities/sale.entity";
import { Repository } from "typeorm";

@QueryHandler(FindOneSaleQuery)
export class FindOneSaleHandler implements IQueryHandler<FindOneSaleQuery> {
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,
  ) {}

  async execute(query: FindOneSaleQuery) {
    const { id } = query;

    const sale = await this.saleRepository.findOne({
      where: { id },
      relations: {
        payment: true,
        saleItems: {
          product: true,
        },
      },
    });

    return sale;
  }
}
