import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Index,
} from 'typeorm';
import { Group } from './group.entity';
import { Transaction } from './transaction.entity';

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  POWER_USER = 'POWER_USER',
  USER = 'USER',
  SUPPORT_DESK = 'SUPPORT_DESK',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column('varchar', { unique: true })
  username: string;

  @Column({
    select: false,
    nullable: true,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @ManyToOne(() => Group, (group) => group.users)
  group: Group;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];
}
