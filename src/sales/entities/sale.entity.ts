import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Payment } from "@/payments/entities/payment.entity";
import { Invoice } from "@/invoices/entities/invoice.entity";
import { SaleItem } from "../sales-items/entities/sales-item.entity";

@Entity({ name: "sales" })
export class Sale {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => SaleItem, (item) => item.sale, { cascade: ['insert', 'update'] })
    items: SaleItem[];

    @OneToMany(() => Payment, (payment) => payment.sale, { eager: true })
    payments: Payment[];

    @OneToOne(() => Invoice, (invoice) => invoice.sale, { eager: true })
    invoice: Invoice;

    @Column("decimal", { precision: 10, scale: 2, nullable: true, default: null })
    total?: number | null;
}