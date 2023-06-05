import { GroupRepository } from '../../domain/repositories/group.repository';
import { GroupM } from '../../domain/model/group';

export class getGroupsUseCases {
  constructor(private readonly groupRepository: GroupRepository) {}

  async execute(): Promise<GroupM[]> {
    console.log('Get Group Usecases in Usecases');
    const result = await this.groupRepository.findAll();
    return result;
  }
}
