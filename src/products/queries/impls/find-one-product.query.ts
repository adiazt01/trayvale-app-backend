import { Product } from "@/products/entities/product.entity";
import { Query } from "@nestjs/cqrs";

export class FindOneProductQuery extends Query<Product | null> {
    constructor(
        public readonly productId: string,
    ) 
    {super()}
}
