import { UserM } from './user';

export class GroupM {
  id: number;
  admin: UserM;
  users: UserM[];
}
