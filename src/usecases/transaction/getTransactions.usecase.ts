import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { TransactionM } from '../../domain/model/transaction';

export class getTransactionsUsecases {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(): Promise<TransactionM[]> {
    const result = await this.transactionRepository.findAll();
    return result;
  }
}
