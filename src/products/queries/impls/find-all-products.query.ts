import { Product } from "@/products/entities/product.entity";
import { Query } from "@nestjs/cqrs";

export class FindAllProductsQuery extends Query<Product[]> {
    constructor() 
    {super()}
}
