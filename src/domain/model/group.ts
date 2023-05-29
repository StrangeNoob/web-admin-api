import { UserM } from './user';

export class GroupM {
  id: number;
  admin_id: UserM;
  users: UserM[];
}
