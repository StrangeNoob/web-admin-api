import { ApiProperty } from '@nestjs/swagger';
import { UserM } from '../../../domain/model/user';
import { TransactionM } from '../../../domain/model/transaction';

export class UserPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  username: string;
  @ApiProperty()
  role: string;
  @ApiProperty()
  group: number;
  @ApiProperty()
  transactions: TransactionM[];

  constructor(user: UserM) {
    this.id = user.id;
    this.username = user.username;
    this.role = user.role;
    this.group = user.group.id;
    this.transactions = user.transactions;
  }
}
