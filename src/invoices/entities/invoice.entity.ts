import { Customer } from '@/customers/entities/customer';
import { Sale } from '@/sales/entities/sale.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'invoices' })
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Sale, (sale) => sale.invoice, { eager: true })
  sale: Sale;

  @OneToOne(() => Customer, { eager: true, nullable: true })
  customer?: Customer | null;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;
}
