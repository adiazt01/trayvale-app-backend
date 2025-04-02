import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { SaleItem } from "./sale-item.entity";
import { Payment } from "@/payments/entities/payment.entity";
import { Invoice } from "@/invoices/entities/invoice.entity";

@Entity({
    name: "sales"
})
export class Sale {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => SaleItem, (item) => item.sale, { cascade: true })
    items: SaleItem[];

    @OneToMany(() => Payment, (payment) => payment.sale, { eager: true })
    payments: Payment[];

    @OneToOne(() => Invoice, (payment) => payment.sale, { eager: true })
    invoice: Payment;

    @Column("decimal", {
        nullable: true,
        default: null
    })
    totalPrice?: number | null;
}
