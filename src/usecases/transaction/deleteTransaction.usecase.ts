import { TransactionRepository } from '../../domain/repositories/transaction.repository';

export class deleteTransactionUsecases {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(transactionId: number): Promise<void> {
    const result = await this.transactionRepository.deleteById(transactionId);
    return result;
  }
}
