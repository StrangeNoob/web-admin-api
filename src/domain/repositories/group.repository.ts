import { GroupM } from '../model/group';

export interface GroupRepository {
  insert(group: GroupM): Promise<GroupM>;
  findAll(): Promise<GroupM[]>;
  findById(id: number): Promise<GroupM>;
  updateUser(id: number, user: number): Promise<GroupM>;
  changeAdmin(id: number, admin_id: number): Promise<GroupM>;
  deleteById(id: number): Promise<void>;
  findByAdmin(admin: number): Promise<GroupM[]>;
}
