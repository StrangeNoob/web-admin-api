import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { TransactionM } from '../../domain/model/transaction';

export class getTransactionByUserUsecases {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(userId: number): Promise<TransactionM[]> {
    const result = await this.transactionRepository.findByUser(userId);
    return result;
  }
}
