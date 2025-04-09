import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column('text', {
    unique: true,
    nullable: false,
  })
  email: string;

  @Index()
  @Column('text', {
    unique: true,
    nullable: false,
  })
  username: string;

  @Column('text', {
    nullable: false,
    select: false,
  })
  password: string;
}
