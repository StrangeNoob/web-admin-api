import { GroupRepository } from '../../domain/repositories/group.repository';
import { GroupM } from '../../domain/model/group';

export class getGroupsUseCases {
  constructor(private readonly groupRepository: GroupRepository) {}

  async execute(): Promise<GroupM[]> {
    const result = await this.groupRepository.findAll();
    return result;
  }
}
