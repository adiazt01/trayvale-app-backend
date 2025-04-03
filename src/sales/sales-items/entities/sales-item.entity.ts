import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "@/products/entities/product.entity";
import { Sale } from "@/sales/entities/sale.entity";

@Entity({
    name: "sale_items"
})
export class SaleItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Sale, (sale) => sale.items, { onDelete: "CASCADE" })
    sale: Sale;

    @ManyToOne(() => Product, { eager: true })
    product: Product;

    @Column("number")
    quantity: number;

    @Column("number")
    unitPrice: number;

    @Column("number")
    totalPrice: number;
}