import { DynamicModule, Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { RepositoriesModule } from '../repositories/repositories.module';
import { DatabaseUserRepository } from '../repositories/user.repository';
import { UseCaseProxy } from './usecases-proxy';
import { addUserUseCases } from '../../usecases/user/addUser.usecases';
import { deleteUserUseCases } from '../../usecases/user/deleteUser.usecases';
import { getUserUseCases } from '../../usecases/user/getUser.usecases';
import { getUsersUseCases } from '../../usecases/user/getUsers.usecases';
import { LoggerService } from '../logger/logger.service';
import { DatabaseGroupRepository } from '../repositories/group.repository';
import { getGroupUseCases } from '../../usecases/group/getGroup.usecases';
import { getGroupsUseCases } from '../../usecases/group/getGroups.usecases';
import { getGroupsByAdminUseCases } from '../../usecases/group/getGroupByAdmin.usecases';
import { createGroupUseCases } from '../../usecases/group/createGroup.usecases';
import { updateUserUseCases } from '../../usecases/group/updateUser.usecases';
import { changeAdminUseCases } from '../../usecases/group/changeAdmin.usecases';
import { deleteGroupUseCases } from '../../usecases/group/deletGroup.usecases';
import { changeUserRoleUseCases } from 'src/usecases/user/changeRole.usecases';

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

  static GET_GROUP_USECASES_PROXY = 'getGROUPUsecasesProxy';
  static GET_GROUPS_USECASES_PROXY = 'getGroupsUsecasesProxy';
  static GET_GROUPS_BY_ADMIN_USECASES_PROXY = 'getGroupsByAdminUsecasesProxy';
  static POST_GROUP_USECASES_PROXY = 'postGroupUsecasesProxy';
  static CHANGE_ADMIN_USECASES_PROXY = 'changeAdminUsecasesProxy';
  static ADD_USER_TO_GROUP_USECASES_PROXY = 'addUserToGroupUsecasesProxy';
  static DELETE_GROUP_USECASES_PROXY = 'deleteGroupUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [DatabaseUserRepository],
          provide: UsecasesProxyModule.GET_USER_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepository: DatabaseUserRepository,
          ) => new UseCaseProxy(new getUserUseCases(logger, userRepository)),
        },
        {
          inject: [DatabaseUserRepository],
          provide: UsecasesProxyModule.GET_USERS_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepository: DatabaseUserRepository,
          ) => new UseCaseProxy(new getUsersUseCases(logger, userRepository)),
        },
        {
          inject: [DatabaseUserRepository, DatabaseGroupRepository],
          provide: UsecasesProxyModule.POST_USER_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepository: DatabaseUserRepository,
          ) => new UseCaseProxy(new addUserUseCases(logger, userRepository)),
        },
        {
          inject: [DatabaseUserRepository],
          provide: UsecasesProxyModule.DELETE_USER_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepository: DatabaseUserRepository,
          ) => new UseCaseProxy(new deleteUserUseCases(logger, userRepository)),
        },
        {
          inject: [DatabaseUserRepository],
          provide: UsecasesProxyModule.CHANGE_USER_ROLE_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepository: DatabaseUserRepository,
          ) =>
            new UseCaseProxy(
              new changeUserRoleUseCases(logger, userRepository),
            ),
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
          ) =>
            new UseCaseProxy(
              new getGroupsByAdminUseCases(userRepository, groupRepository),
            ),
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
      ],
    };
  }
}
