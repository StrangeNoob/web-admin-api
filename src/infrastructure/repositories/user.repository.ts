import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserM } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User, UserRole } from '../entities/user.entity';
import { Group } from '../entities/group.entity';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userEntityRepository: Repository<User>,
  ) {}

  async changeUserRole(id: number, role: UserRole): Promise<UserM> {
    const userEntity = await this.userEntityRepository.findOneByOrFail({
      id,
    });
    userEntity.role = role;

    return this.toUser(userEntity);
  }

  async insert(user: UserM): Promise<UserM> {
    const userEntity = this.toUserEntity(user);
    console.log(userEntity);
    const result = await this.userEntityRepository.insert(userEntity);
    console.log(result);
    return this.toUser(result.generatedMaps[0] as User);
  }

  async findAll(): Promise<UserM[]> {
    const userEntities = await this.userEntityRepository.find();
    return userEntities.map((v) => this.toUser(v));
  }

  async findById(id: number): Promise<UserM> {
    const userEntity = await this.userEntityRepository.findOneByOrFail({
      id,
    });
    return this.toUser(userEntity);
  }

  async deleteById(id: number): Promise<void> {
    await this.userEntityRepository.delete({
      id: id,
    });
    return;
  }

  async addUserToGroup(id: number, groupId: Group): Promise<User> {
    const userEntity = await this.userEntityRepository.findOneByOrFail({
      id,
    });
    userEntity.group = groupId;
    const result = await this.userEntityRepository.save(userEntity);
    return result;
  }

  toUser(userEntity: User): UserM {
    const userModel: UserM = new UserM();
    userModel.id = userEntity.id;
    userModel.username = userEntity.username;
    userModel.group = userEntity.group;
    userModel.transactions = userEntity.transactions;
    return userModel;
  }

  toUserEntity(userModel: UserM): User {
    const userEntity: User = new User();

    userEntity.username = userModel.username;
    userEntity.group = userModel.group;
    userEntity.transactions = userModel.transactions;
    // userEntity.transactions = userModel.transactions.map((v) =>
    //   this.databaseTransactionRepository.toTransactionEntity(v),
    // );
    userEntity.role = userModel.role;

    return userEntity;
  }
}
