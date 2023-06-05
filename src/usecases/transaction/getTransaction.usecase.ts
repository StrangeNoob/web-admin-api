import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { TransactionM } from '../../domain/model/transaction';

export class getTransactionUsecases {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(transactionId: number): Promise<TransactionM> {
    const result = await this.transactionRepository.findById(transactionId);
    return result;
  }
}
