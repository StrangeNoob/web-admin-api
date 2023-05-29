import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { User } from '../entities/user.entity';
import { DatabaseUserRepository } from './user.repository';
import { DatabaseGroupRepository } from './group.repository';
import { Group } from '../entities/group.entity';
import { Transaction } from '../entities/transaction.entity';
import { DatabaseTransactionRepository } from './transaction.repository';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([User, Group, Transaction]),
  ],
  providers: [
    DatabaseUserRepository,
    DatabaseGroupRepository,
    DatabaseTransactionRepository,
  ],
  exports: [
    DatabaseUserRepository,
    DatabaseGroupRepository,
    DatabaseTransactionRepository,
  ],
})
export class RepositoriesModule {}
