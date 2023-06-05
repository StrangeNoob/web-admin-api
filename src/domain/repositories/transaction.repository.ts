import { TransactionM } from '../model/transaction';

export interface TransactionRepository {
  insert(transaction: TransactionM): Promise<TransactionM>;
  findAll(): Promise<TransactionM[]>;
  findById(id: number): Promise<TransactionM>;
  deleteById(id: number): Promise<void>;
  findByUser(userId: number): Promise<TransactionM[]>;
}
