import { GroupM } from 'src/domain/model/group';
import { UserM } from 'src/domain/model/user';
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
    return this.toGroup(result.generatedMaps[0] as Group);
  }

  async findAll(): Promise<GroupM[]> {
    const groupEntities = await this.groupEntityRepository.find();
    return groupEntities.map((v) => this.toGroup(v));
  }

  async findById(id: number): Promise<GroupM> {
    const groupEntity = await this.groupEntityRepository.findOneByOrFail({
      id,
    });
    return this.toGroup(groupEntity);
  }

  async findByAdmin(admin: UserM): Promise<GroupM[]> {
    const groupEntities = await this.groupEntityRepository.find({
      where: {
        admin_id: admin,
      },
    });
    return groupEntities.map((v) => this.toGroup(v));
  }

  async updateUser(id: number, userId: number): Promise<GroupM> {
    const groupEntity = await this.groupEntityRepository.findOneByOrFail({
      id,
    });

    const userEntity = await this.databaseUserRepository.addUserToGroup(
      userId,
      groupEntity,
    );
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

    groupEntity.admin_id = adminEntity;
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
    groupModel.admin_id = groupEntity.admin_id;
    groupModel.users = groupEntity.users.map((v) =>
      this.databaseUserRepository.toUser(v),
    );
    return groupModel;
  }

  toGroupEntity(groupModel: GroupM): Group {
    const groupEntity: Group = new Group();

    groupEntity.id = groupModel.id;
    groupEntity.admin_id = this.databaseUserRepository.toUser(
      groupModel.admin_id,
    );
    groupEntity.users = groupModel.users.map((v) =>
      this.databaseUserRepository.toUserEntity(v),
    );
    return groupEntity;
  }
}
