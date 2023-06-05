import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';
import { User } from '../../../infrastructure/entities/user.entity';
import { Group } from '../../../infrastructure/entities/group.entity';
import { Transaction } from '../../../infrastructure/entities/transaction.entity';

export const getTypeOrmModuleOptions = (
  config: EnvironmentConfigService,
): TypeOrmModuleOptions => {
  console.log(__dirname + './../../entities/**.entity.ts');
  return {
    type: 'postgres',
    url: config.getDatabaseUrl(),
    entities: [User, Group, Transaction],
    synchronize: true,
    ssl: true,
    logging: true,
  } as TypeOrmModuleOptions;
};

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class TypeOrmConfigModule {}
