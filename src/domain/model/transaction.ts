import { UserM } from './user';

export class TransactionM {
  id: number;
  content: string;
  user: UserM;
}
