import { DynamicModule, Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { RepositoriesModule } from '../repositories/repositories.module';
import { DatabaseUserRepository } from '../repositories/user.repository';
import { DatabaseGroupRepository } from '../repositories/group.repository';
import { DatabaseTransactionRepository } from '../repositories/transaction.repository';
import { UseCaseProxy } from './usecases-proxy';
import { addUserUseCases } from '../../usecases/user/addUser.usecases';
import { deleteUserUseCases } from '../../usecases/user/deleteUser.usecases';
import { getUserUseCases } from '../../usecases/user/getUser.usecases';
import { getUsersUseCases } from '../../usecases/user/getUsers.usecases';
import { getGroupUseCases } from '../../usecases/group/getGroup.usecases';
import { getGroupsUseCases } from '../../usecases/group/getGroups.usecases';
import { getGroupsByAdminUseCases } from '../../usecases/group/getGroupByAdmin.usecases';
import { createGroupUseCases } from '../../usecases/group/createGroup.usecases';
import { updateUserUseCases } from '../../usecases/group/updateUser.usecases';
import { changeAdminUseCases } from '../../usecases/group/changeAdmin.usecases';
import { deleteGroupUseCases } from '../../usecases/group/deletGroup.usecases';
import { changeUserRoleUseCases } from '../../usecases/user/changeRole.usecases';
import { getTransactionUsecases } from '../../usecases/transaction/getTransaction.usecase';
import { getTransactionsUsecases } from '../../usecases/transaction/getTransactions.usecase';
import { getTransactionByUserUsecases } from '../../usecases/transaction/getTransactionByUserId.usecases';
import { addTransactionUsecases } from '../../usecases/transaction/addTransaction.usecase';
import { deleteTransactionUsecases } from '../../usecases/transaction/deleteTransaction.usecase';

@Module({
  imports: [
    LoggerModule,
    EnvironmentConfigModule,
    RepositoriesModule,
    ExceptionsModule,
  ],
})
export class UsecasesProxyModule {
  // User Poxies
  static GET_USER_USECASES_PROXY = 'getUserUsecasesProxy';
  static GET_USERS_USECASES_PROXY = 'getUsersUsecasesProxy';
  static POST_USER_USECASES_PROXY = 'postUserUsecasesProxy';
  static DELETE_USER_USECASES_PROXY = 'deleteUserUsecasesProxy';
  static CHANGE_USER_ROLE_USECASES_PROXY = 'changeUserRoleUsecasesProxy';

  // Group Proxies
  static GET_GROUP_USECASES_PROXY = 'getGroupUsecasesProxy';
  static GET_GROUPS_USECASES_PROXY = 'getGroupsUsecasesProxy';
  static GET_GROUPS_BY_ADMIN_USECASES_PROXY = 'getGroupsByAdminUsecasesProxy';
  static POST_GROUP_USECASES_PROXY = 'postGroupUsecasesProxy';
  static CHANGE_ADMIN_USECASES_PROXY = 'changeAdminUsecasesProxy';
  static ADD_USER_TO_GROUP_USECASES_PROXY = 'addUserToGroupUsecasesProxy';
  static DELETE_GROUP_USECASES_PROXY = 'deleteGroupUsecasesProxy';

  // Transaction Proxies

  static GET_TRANSACTION_USECASES_PROXY = 'getTransactionUsecasesProxy';
  static GET_TRANSACTIONS_USECASES_PROXY = 'getTransactionsUsecasesProxy';
  static GET_TRANSACTIONS_BY_USER_USECASES_PROXY =
    'getTransactionsByUserUsecasesProxy';
  static POST_TRANSACTION_USECASES_PROXY = 'postTransactionUsecasesProxy';
  static DELETE_TRANSACTION_USECASES_PROXY = 'deleteTransactionUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [DatabaseUserRepository],
          provide: UsecasesProxyModule.GET_USER_USECASES_PROXY,
          useFactory: (userRepository: DatabaseUserRepository) =>
            new UseCaseProxy(new getUserUseCases(userRepository)),
        },
        {
          inject: [DatabaseUserRepository],
          provide: UsecasesProxyModule.GET_USERS_USECASES_PROXY,
          useFactory: (userRepository: DatabaseUserRepository) =>
            new UseCaseProxy(new getUsersUseCases(userRepository)),
        },
        {
          inject: [DatabaseUserRepository],
          provide: UsecasesProxyModule.POST_USER_USECASES_PROXY,
          useFactory: (userRepository: DatabaseUserRepository) =>
            new UseCaseProxy(new addUserUseCases(userRepository)),
        },
        {
          inject: [DatabaseUserRepository],
          provide: UsecasesProxyModule.DELETE_USER_USECASES_PROXY,
          useFactory: (userRepository: DatabaseUserRepository) =>
            new UseCaseProxy(new deleteUserUseCases(userRepository)),
        },
        {
          inject: [DatabaseUserRepository],
          provide: UsecasesProxyModule.CHANGE_USER_ROLE_USECASES_PROXY,
          useFactory: (userRepository: DatabaseUserRepository) =>
            new UseCaseProxy(new changeUserRoleUseCases(userRepository)),
        },
        {
          inject: [DatabaseGroupRepository],
          provide: UsecasesProxyModule.GET_GROUP_USECASES_PROXY,
          useFactory: (groupRepository: DatabaseGroupRepository) =>
            new UseCaseProxy(new getGroupUseCases(groupRepository)),
        },
        {
          inject: [DatabaseGroupRepository],
          provide: UsecasesProxyModule.GET_GROUPS_USECASES_PROXY,
          useFactory: (groupRepository: DatabaseGroupRepository) =>
            new UseCaseProxy(new getGroupsUseCases(groupRepository)),
        },
        {
          inject: [DatabaseUserRepository, DatabaseGroupRepository],
          provide: UsecasesProxyModule.GET_GROUPS_BY_ADMIN_USECASES_PROXY,
          useFactory: (
            userRepository: DatabaseUserRepository,
            groupRepository: DatabaseGroupRepository,
          ) => new UseCaseProxy(new getGroupsByAdminUseCases(groupRepository)),
        },
        {
          inject: [DatabaseUserRepository, DatabaseGroupRepository],
          provide: UsecasesProxyModule.POST_GROUP_USECASES_PROXY,
          useFactory: (
            userRepository: DatabaseUserRepository,
            groupRepository: DatabaseGroupRepository,
          ) =>
            new UseCaseProxy(
              new createGroupUseCases(userRepository, groupRepository),
            ),
        },
        {
          inject: [DatabaseGroupRepository],
          provide: UsecasesProxyModule.ADD_USER_TO_GROUP_USECASES_PROXY,
          useFactory: (groupRepository: DatabaseGroupRepository) =>
            new UseCaseProxy(new updateUserUseCases(groupRepository)),
        },
        {
          inject: [DatabaseGroupRepository],
          provide: UsecasesProxyModule.CHANGE_ADMIN_USECASES_PROXY,
          useFactory: (groupRepository: DatabaseGroupRepository) =>
            new UseCaseProxy(new changeAdminUseCases(groupRepository)),
        },
        {
          inject: [DatabaseGroupRepository],
          provide: UsecasesProxyModule.DELETE_GROUP_USECASES_PROXY,
          useFactory: (groupRepository: DatabaseGroupRepository) =>
            new UseCaseProxy(new deleteGroupUseCases(groupRepository)),
        },
        {
          inject: [DatabaseTransactionRepository],
          provide: UsecasesProxyModule.GET_TRANSACTION_USECASES_PROXY,
          useFactory: (transactionRepository: DatabaseTransactionRepository) =>
            new UseCaseProxy(new getTransactionUsecases(transactionRepository)),
        },
        {
          inject: [DatabaseTransactionRepository],
          provide: UsecasesProxyModule.GET_TRANSACTIONS_USECASES_PROXY,
          useFactory: (transactionRepository: DatabaseTransactionRepository) =>
            new UseCaseProxy(
              new getTransactionsUsecases(transactionRepository),
            ),
        },
        {
          inject: [DatabaseTransactionRepository],
          provide: UsecasesProxyModule.GET_TRANSACTIONS_BY_USER_USECASES_PROXY,
          useFactory: (transactionRepository: DatabaseTransactionRepository) =>
            new UseCaseProxy(
              new getTransactionByUserUsecases(transactionRepository),
            ),
        },
        {
          inject: [DatabaseTransactionRepository],
          provide: UsecasesProxyModule.GET_TRANSACTION_USECASES_PROXY,
          useFactory: (transactionRepository: DatabaseTransactionRepository) =>
            new UseCaseProxy(new getTransactionUsecases(transactionRepository)),
        },
        {
          inject: [DatabaseTransactionRepository, DatabaseUserRepository],
          provide: UsecasesProxyModule.POST_TRANSACTION_USECASES_PROXY,
          useFactory: (
            transactionRepository: DatabaseTransactionRepository,
            userRepository: DatabaseUserRepository,
          ) =>
            new UseCaseProxy(
              new addTransactionUsecases(transactionRepository, userRepository),
            ),
        },
        {
          inject: [DatabaseTransactionRepository],
          provide: UsecasesProxyModule.DELETE_TRANSACTION_USECASES_PROXY,
          useFactory: (transactionRepository: DatabaseTransactionRepository) =>
            new UseCaseProxy(
              new deleteTransactionUsecases(transactionRepository),
            ),
        },
      ],
      exports: [
        UsecasesProxyModule.GET_USER_USECASES_PROXY,
        UsecasesProxyModule.GET_USERS_USECASES_PROXY,
        UsecasesProxyModule.POST_USER_USECASES_PROXY,
        UsecasesProxyModule.DELETE_USER_USECASES_PROXY,
        UsecasesProxyModule.CHANGE_USER_ROLE_USECASES_PROXY,
        UsecasesProxyModule.GET_GROUP_USECASES_PROXY,
        UsecasesProxyModule.GET_GROUPS_USECASES_PROXY,
        UsecasesProxyModule.GET_GROUPS_BY_ADMIN_USECASES_PROXY,
        UsecasesProxyModule.POST_GROUP_USECASES_PROXY,
        UsecasesProxyModule.ADD_USER_TO_GROUP_USECASES_PROXY,
        UsecasesProxyModule.CHANGE_ADMIN_USECASES_PROXY,
        UsecasesProxyModule.DELETE_GROUP_USECASES_PROXY,
        UsecasesProxyModule.GET_TRANSACTION_USECASES_PROXY,
        UsecasesProxyModule.GET_TRANSACTIONS_USECASES_PROXY,
        UsecasesProxyModule.GET_TRANSACTIONS_BY_USER_USECASES_PROXY,
        UsecasesProxyModule.POST_TRANSACTION_USECASES_PROXY,
        UsecasesProxyModule.DELETE_TRANSACTION_USECASES_PROXY,
      ],
    };
  }
}
