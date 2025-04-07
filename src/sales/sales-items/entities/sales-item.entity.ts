import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "@/products/entities/product.entity";
import { Sale } from "@/sales/entities/sale.entity";
import { BaseEntity } from "@/common/entities/base.entity";

@Entity({
    name: "sale_items"
})
export class SaleItem extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Sale, (sale) => sale.saleItems, { onDelete: "CASCADE",  })
    @JoinColumn()
    sale: Sale;

    @ManyToOne(() => Product, (product) => product.saleItems, { onDelete: "CASCADE",  })
    @JoinColumn()
    product: Product;

    @Column("numeric")
    quantity: number;

    @Column("numeric")
    price: number;

    @Column("numeric")
    totalPrice: number;
}