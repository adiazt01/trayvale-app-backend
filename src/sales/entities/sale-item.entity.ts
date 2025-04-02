import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Sale } from "./sale.entity";
import { Product } from "@/products/entities/product.entity";

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