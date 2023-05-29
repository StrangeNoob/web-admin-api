import { ApiProperty } from '@nestjs/swagger';
import { UserM } from '../../../domain/model/user';
import { GroupM } from '../../../domain/model/group';
import { TransactionM } from '../../../domain/model/transaction';

export class UserPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  username: string;
  @ApiProperty()
  role: string;
  @ApiProperty()
  group: GroupM;
  @ApiProperty()
  transactions: TransactionM[];

  constructor(todo: UserM) {
    this.id = todo.id;
    this.username = todo.username;
    this.role = todo.role;
    this.group = todo.group;
    this.transactions = todo.transactions;
  }
}
