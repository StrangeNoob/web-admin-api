import { GroupRepository } from '../../domain/repositories/group.repository';
import { GroupM } from '../../domain/model/group';
import { UserRepository } from '../../domain/repositories/user.repository';

export class createGroupUseCases {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly groupRepository: GroupRepository,
  ) {}

  async execute(admin_id: number): Promise<GroupM> {
    const group = new GroupM();
    const admin = await this.userRepository.findById(admin_id);
    group.admin_id = admin;
    const result = await this.groupRepository.insert(group);
    return result;
  }
}
