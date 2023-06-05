import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  admin: User;

  @OneToMany(() => User, (user) => user.group)
  users: User[];
}
