import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindAllSalesQuery } from "../impls/find-all-sales.query";
import { InjectRepository } from "@nestjs/typeorm";
import { Sale } from "@/sales/entities/sale.entity";
import { Repository } from "typeorm";
import { createPaginationResult, getSkip } from "@/common/helpers/pagination.helpers";

@QueryHandler(FindAllSalesQuery)
export class FindAllSalesHandler implements IQueryHandler<FindAllSalesQuery> {
    constructor(
        @InjectRepository(Sale)
        private readonly salesRepository: Repository<Sale>,
    ) { }

    async execute(query: FindAllSalesQuery) {
        const { paginationSaleOptionsDto } = query;
        const { limit, order, page } = paginationSaleOptionsDto;

        const skip = getSkip(page, limit);

        const queryBuilder = this.salesRepository
            .createQueryBuilder("sale")
            .innerJoinAndSelect("sale.saleItems", "saleItems")
            .innerJoinAndSelect("saleItems.product", "product")
            .innerJoinAndSelect("sale.payment", "payment")

        queryBuilder
            .orderBy("sale.createdAt", order)
            .skip(skip)
            .take(limit);

        const itemCount = await queryBuilder.getCount();
        const { entities } = await queryBuilder.getRawAndEntities();

        return createPaginationResult(
            entities,
            itemCount,
            paginationSaleOptionsDto,
        )
    }
}
