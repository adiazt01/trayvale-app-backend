import { PaginationMetadataDto } from "../dtos/pagination-metadata.dto";
import { PaginationOptionsDto } from "../dtos/pagination-options.dto";
import { PaginationResultDto } from "../dtos/pagination-result.dto";

export const getSkip = (page: number, limit: number): number => {
    if (page < 1) {
        page = 1;
    }
    if (limit < 1) {
        limit = 10;
    }
    return (page - 1) * limit;
}

/**
 * Creates a pagination result object containing the paginated entities and metadata.
 *
 * @template T - The type of the entities being paginated.
 * @param entities - The array of entities to include in the pagination result.
 * @param itemCount - The total number of items available for pagination.
 * @param paginationOptions - The options used for pagination, such as page number and page size.
 * @returns A `PaginationResultDto` containing the paginated entities and metadata.
 */
export function createPaginationResult<T>(
    entities: T[],
    itemCount: number,
    paginationOptions: PaginationOptionsDto,
): PaginationResultDto<T> {
    const paginationMetaData = new PaginationMetadataDto({
        itemCount,
        paginationOptionsDto: paginationOptions,
    });

    return new PaginationResultDto(entities, paginationMetaData);
}