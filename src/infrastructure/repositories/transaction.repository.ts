import { Injectable } from '@nestjs/common';
import { TransactionM } from 'src/domain/model/transaction';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';

@Injectable()
export class DatabaseTransactionRepository implements TransactionRepository {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionEntityRepository: Repository<Transaction>,
  ) {}

  async insert(transaction: TransactionM): Promise<TransactionM> {
    const transactionEntity = this.toTransactionEntity(transaction);
    const result = await this.transactionEntityRepository.insert(
      transactionEntity,
    );
    console.log(result.generatedMaps[0]);
    return this.toTransaction({
      ...result.generatedMaps[0],
      ...transaction,
    } as TransactionM);
  }

  async findAll(): Promise<TransactionM[]> {
    const transactionEntities = await this.transactionEntityRepository
      .createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.user', 'user')
      .getMany();
    return transactionEntities.map((v) => this.toTransaction(v));
  }

  async findById(id: number): Promise<TransactionM> {
    const transactionEntity = await this.transactionEntityRepository
      .createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.user', 'users')
      .where('transaction.id = :id ', { id })
      .getOne();
    return this.toTransaction(transactionEntity);
  }

  async deleteById(id: number): Promise<void> {
    await this.transactionEntityRepository.delete({
      id: id,
    });
    return;
  }

  async findByUser(userId: number): Promise<TransactionM[]> {
    const transactionEntities = await this.transactionEntityRepository
      .createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.user', 'users')
      .where('users.id = :userId', { userId })
      .getMany();

    return transactionEntities.map((v) => this.toTransaction(v));
  }

  toTransaction(transactionEnitity: Transaction): TransactionM {
    const transactionModel = new TransactionM();
    transactionModel.id = transactionEnitity.id;
    transactionModel.content = transactionEnitity.content;
    transactionModel.user = transactionEnitity.user;
    return transactionModel;
  }

  toTransactionEntity(transactionModel: TransactionM): Transaction {
    const transaction: Transaction = new Transaction();
    transaction.id = transactionModel.id;
    transaction.content = transactionModel.content;
    transaction.user = transactionModel.user;
    return transaction;
  }
}
