import { BaseEntity } from "@/common/entities/base.entity";
import { ColumnNumericTransformer } from "@/common/utils/colum-numeric-transformer.utils";
import { SaleItem } from "@/sales/sales-items/entities/sales-item.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("text")
    name: string;

    @Column("text")
    description: string;

    @Column("numeric", {
        transformer: new ColumnNumericTransformer(),
        scale: 2,
    })
    price: number;

    @OneToMany(() => SaleItem, (saleItem) => saleItem.product)
    saleItems: SaleItem[];
}
