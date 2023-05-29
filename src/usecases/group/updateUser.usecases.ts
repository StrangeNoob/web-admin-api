import { GroupRepository } from '../../domain/repositories/group.repository';
import { GroupM } from '../../domain/model/group';

export class updateUserUseCases {
  constructor(private readonly groupRepository: GroupRepository) {}

  async execute(id: number, user_id: number): Promise<GroupM> {
    const result = await this.groupRepository.updateUser(id, user_id);
    return result;
  }
}
