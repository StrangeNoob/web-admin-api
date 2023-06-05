import { UserM } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/user.repository';

export class getUsersUseCases {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<UserM[]> {
    const result = await this.userRepository.findAll();
    return result;
  }
}
