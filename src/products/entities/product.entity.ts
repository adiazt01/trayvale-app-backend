import { BaseEntity } from "@/common/entities/base.entity";
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

    @Column("decimal")
    price: number;

    @OneToMany(() => SaleItem, (saleItem) => saleItem.product)
    saleItems: SaleItem[];
}
