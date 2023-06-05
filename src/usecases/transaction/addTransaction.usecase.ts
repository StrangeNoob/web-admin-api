import { UserRepository } from 'src/domain/repositories/user.repository';
import { TransactionM } from '../../domain/model/transaction';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';

export class addTransactionUsecases {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(content: string, userId: number): Promise<TransactionM> {
    const user = await this.userRepository.findById(userId);
    const transaction = new TransactionM();
    transaction.content = content;
    transaction.user = user;
    const result = await this.transactionRepository.insert(transaction);
    return result;
  }
}
