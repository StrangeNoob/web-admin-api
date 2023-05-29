import { GroupRepository } from '../../domain/repositories/group.repository';
import { GroupM } from '../../domain/model/group';

export class getGroupUseCases {
  constructor(private readonly groupRepository: GroupRepository) {}

  async execute(id: number): Promise<GroupM> {
    const result = await this.groupRepository.findById(id);
    return result;
  }
}
