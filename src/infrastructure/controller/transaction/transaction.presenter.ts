import { ApiProperty } from '@nestjs/swagger';
import { TransactionM } from '../../../domain/model/transaction';

export class TransactionPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  content: string;

  constructor(transaction: TransactionM) {
    this.id = transaction.id;
    this.userId = transaction.user.id;
    this.content = transaction.content;
  }
}
