import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Payment } from '@/payments/entities/payment.entity';
import { Invoice } from '@/invoices/entities/invoice.entity';
import { SaleItem } from '../sales-items/entities/sales-item.entity';
import { BaseEntity } from '@/common/entities/base.entity';

@Entity({ name: 'sales' })
export class Sale extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => SaleItem, (item) => item.sale, {
    cascade: ['insert', 'update'],
  })
  saleItems: SaleItem[];

  @OneToOne(() => Payment, (payment) => payment.sale, { cascade: false })
  payment: Payment;

  @OneToOne(() => Invoice, (invoice) => invoice.sale, { nullable: true })
  invoice?: Invoice;
}
