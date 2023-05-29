import { GroupM } from '../model/group';
import { UserM } from '../model/user';

export interface GroupRepository {
  insert(group: GroupM): Promise<GroupM>;
  findAll(): Promise<GroupM[]>;
  findById(id: number): Promise<GroupM>;
  updateUser(id: number, user: number): Promise<GroupM>;
  changeAdmin(id: number, admin_id: number): Promise<GroupM>;
  deleteById(id: number): Promise<void>;
  findByAdmin(admin: UserM): Promise<GroupM[]>;
}
