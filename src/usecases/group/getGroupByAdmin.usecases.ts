import { GroupRepository } from '../../domain/repositories/group.repository';
import { GroupM } from '../../domain/model/group';
import { UserRepository } from '../../domain/repositories/user.repository';

export class getGroupsByAdminUseCases {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly groupRepository: GroupRepository,
  ) {}

  async execute(admin_id: number): Promise<GroupM[]> {
    const admin = await this.userRepository.findById(admin_id);
    const result = await this.groupRepository.findByAdmin(admin);
    return result;
  }
}
