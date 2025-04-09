import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PaymentMethod } from '../enums/payment-method.enum';
import { Sale } from '@/sales/entities/sale.entity';
import { PaymentStatus } from '../enums/payment-status.enum';

@Entity({
  name: 'payments',
})
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('enum', {
    enum: PaymentMethod,
  })
  method: PaymentMethod;

  @Column('decimal')
  amount: number;

  @Column('text', { nullable: true })
  transactionId: string | null;

  @OneToOne(() => Sale, (sale) => sale.payment, { onDelete: 'CASCADE' })
  @JoinColumn()
  sale: Sale;

  @Column('enum', {
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;
}
