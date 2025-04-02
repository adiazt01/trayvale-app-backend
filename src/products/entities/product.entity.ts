import { BaseEntity } from "@/common/entities/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
