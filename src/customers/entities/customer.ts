import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'customers',
})
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column('text')
  fullName: string;

  @Index()
  @Column('text', { nullable: true, default: null })
  nickname?: string;

  @Index()
  @Column('text', { nullable: true, default: null })
  phone?: string;
}
