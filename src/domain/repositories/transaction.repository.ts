import { TransactionM } from '../model/transaction';

export interface TransactionRepository {
  insert(transaction: TransactionM): Promise<void>;
  findAll(): Promise<TransactionM[]>;
  findById(id: number): Promise<TransactionM>;
  updateTransaction(id: number, content: string): Promise<TransactionM>;
  deleteById(id: number): Promise<void>;
  findByUser(userId: number): Promise<TransactionM[]>;
}
