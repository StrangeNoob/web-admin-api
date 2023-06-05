import { ILogger } from '../../domain/logger/logger.internface';
import { UserRepository } from '../../domain/repositories/user.repository';

export class deleteUserUseCases {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number): Promise<void> {
    await this.userRepository.deleteById(id);
  }
}
