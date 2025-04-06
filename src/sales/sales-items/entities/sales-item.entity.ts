import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "@/products/entities/product.entity";
import { Sale } from "@/sales/entities/sale.entity";

@Entity({
    name: "sale_items"
})
export class SaleItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Sale, (sale) => sale.saleItems, { onDelete: "CASCADE",  })
    sale: Sale;

    @ManyToOne(() => Product, (product) => product.saleItems, { eager: true })
    product: Product;

    @Column("numeric")
    quantity: number;

    @Column("numeric")
    price: number;

    @Column("numeric")
    totalPrice: number;
}