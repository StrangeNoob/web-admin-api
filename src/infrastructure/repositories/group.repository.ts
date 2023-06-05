import { GroupM } from 'src/domain/model/group';
import { GroupRepository } from '../../domain/repositories/group.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from '../entities/group.entity';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { DatabaseUserRepository } from './user.repository';

export class DatabaseGroupRepository implements GroupRepository {
  constructor(
    @InjectRepository(Group)
    private readonly groupEntityRepository: Repository<Group>,
    @InjectRepository(User)
    private readonly userEntityRepository: Repository<User>,
    private readonly databaseUserRepository: DatabaseUserRepository,
  ) {}

  async insert(group: GroupM): Promise<GroupM> {
    const groupEntity = this.toGroupEntity(group);
    const result = await this.groupEntityRepository.insert(groupEntity);
    return this.toGroup({
      ...result.generatedMaps[0],
      ...group,
    } as Group);
  }

  async findAll(): Promise<GroupM[]> {
    const groupEntities = await this.groupEntityRepository
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.users', 'users')
      .leftJoinAndSelect('group.admin', 'admin')
      .getMany();
    return groupEntities.map((v) => this.toGroup(v));
  }

  async findById(id: number): Promise<GroupM> {
    const groupEntity = await this.groupEntityRepository.findOne({
      where: { id },
      relations: ['users', 'admin'],
    });
    console.log(groupEntity);
    return this.toGroup(groupEntity);
  }

  async findByAdmin(adminId: number): Promise<GroupM[]> {
    const groupEntities = await this.groupEntityRepository
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.users', 'user')
      .leftJoinAndSelect('group.admin', 'admin')
      .where('admin.id = :adminId', { adminId })
      .getMany();

    console.log(groupEntities);
    return groupEntities.map((v) => this.toGroup(v));
  }

  async updateUser(id: number, userId: number): Promise<GroupM> {
    const groupEntity = await this.groupEntityRepository.findOne({
      where: {
        id,
      },
      relations: ['users'],
    });

    const userEntity = await this.databaseUserRepository.addUserToGroup(
      userId,
      groupEntity,
    );
    console.log(groupEntity);
    if (!groupEntity.users) {
      groupEntity.users = [];
    }
    groupEntity.users.push(userEntity);
    await this.groupEntityRepository.save(groupEntity);
    return this.toGroup(groupEntity);
  }

  async changeAdmin(id: number, admin_id: number): Promise<GroupM> {
    const groupEntity = await this.groupEntityRepository.findOneByOrFail({
      id,
    });

    const adminEntity = await this.userEntityRepository.findOneByOrFail({
      id: admin_id,
    });

    groupEntity.admin = adminEntity;
    await this.groupEntityRepository.save(groupEntity);

    return this.toGroup(groupEntity);
  }

  async deleteById(id: number): Promise<void> {
    await this.groupEntityRepository.delete({
      id: id,
    });
    return;
  }

  toGroup(groupEntity: Group): GroupM {
    const groupModel: GroupM = new GroupM();

    groupModel.id = groupEntity.id;
    groupModel.admin = groupEntity.admin;
    groupModel.users = groupEntity.users
      ? groupEntity.users.map((v) => this.databaseUserRepository.toUser(v))
      : [];
    return groupModel;
  }

  toGroupEntity(groupModel: GroupM): Group {
    const groupEntity: Group = new Group();

    groupEntity.id = groupModel.id;
    groupEntity.admin = this.databaseUserRepository.toUser(groupModel.admin);
    groupEntity.users = groupModel.users
      ? groupModel.users.map((v) => this.databaseUserRepository.toUserEntity(v))
      : [];
    return groupEntity;
  }
}
