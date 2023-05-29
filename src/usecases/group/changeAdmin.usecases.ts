import { GroupRepository } from '../../domain/repositories/group.repository';
import { GroupM } from '../../domain/model/group';

export class changeAdminUseCases {
  constructor(private readonly groupRepository: GroupRepository) {}

  async execute(id: number, admin_id: number): Promise<GroupM> {
    const result = await this.groupRepository.changeAdmin(id, admin_id);
    return result;
  }
}
