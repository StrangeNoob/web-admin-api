import { UserRole } from '../model/role';
import { UserM } from '../model/user';

export interface UserRepository {
  insert(user: UserM): Promise<UserM>;
  findAll(): Promise<UserM[]>;
  findById(id: number): Promise<UserM>;
  deleteById(id: number): Promise<void>;
  changeUserRole(id: number, role: UserRole): Promise<UserM>;
}
