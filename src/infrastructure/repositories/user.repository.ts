import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserM } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User, UserRole } from '../entities/user.entity';
import { Group } from '../entities/group.entity';
import { GroupM } from 'src/domain/model/group';

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
    const updatedUser = await this.userEntityRepository.save(userEntity);
    return this.toUser(updatedUser);
  }

  async insert(user: UserM): Promise<UserM> {
    const userEntity = this.toUserEntity(user);
    const result = await this.userEntityRepository.insert(userEntity);
    console.log(result);
    return this.toUser({ ...result.generatedMaps[0], ...user } as User);
  }

  async findAll(): Promise<UserM[]> {
    const userEntities = await this.userEntityRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.group', 'groups')
      .leftJoinAndSelect('user.transactions', 'transactions')
      .where('user.role = :role', { role: 'USER' })
      .getMany();
    return userEntities.map((v) => this.toUser(v));
  }

  async findById(id: number): Promise<UserM> {
    const userEntity = await this.userEntityRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.group', 'groups')
      .leftJoinAndSelect('user.transactions', 'transactions')
      .where('user.id = :id', { id })
      .getOne();
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
    userModel.role = userEntity.role;
    userModel.username = userEntity.username;
    userModel.group = userEntity.group ?? ({} as GroupM);
    userModel.transactions = userEntity.transactions ?? [];
    return userModel;
  }

  toUserEntity(userModel: UserM): User {
    const userEntity: User = new User();
    if ('id' in userModel && userModel.id) userEntity.id = userModel.id;
    userEntity.username = userModel.username;
    userEntity.group = userModel.group ?? ({} as GroupM);
    userEntity.transactions = userModel.transactions ?? [];
    userEntity.role = userModel.role;

    return userEntity;
  }
}
