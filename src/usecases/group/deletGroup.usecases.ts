import { GroupRepository } from '../../domain/repositories/group.repository';

export class deleteGroupUseCases {
  constructor(private readonly groupRepository: GroupRepository) {}

  async execute(id: number): Promise<void> {
    await this.groupRepository.deleteById(id);
    return;
  }
}
