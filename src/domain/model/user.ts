import { GroupM } from './group';
import { UserRole } from './role';
import { TransactionM } from './transaction';

export class UserM {
  id: number;
  username: string;
  password: string;
  role: UserRole;
  group: GroupM;
  transactions: TransactionM[];
}
