import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PaymentMethod } from "../enums/payment-method.enum";
import { Sale } from "@/sales/entities/sale.entity";
import { PaymentStatus } from "../enums/payment-status.enum";

@Entity({
    name: "payments"
})
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("enum", {
        enum: PaymentMethod,
    })
    method: PaymentMethod;

    @Column("decimal")
    amount: number;

    @Column("text", { nullable: true })
    transactionId: string | null;

    @ManyToOne(() => Sale, (sale) => sale.payment, { nullable: true })
    sale?: Sale;

    @Column("enum", {
        enum: PaymentStatus,
        default: PaymentStatus.PENDING,
    })
    status: PaymentStatus;
}
