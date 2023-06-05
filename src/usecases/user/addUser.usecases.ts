import { UserM } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/user.repository';

export class addUserUseCases {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(email: string): Promise<UserM> {
    const user = new UserM();
    user.username = email;
    const result = await this.userRepository.insert(user);
    return result;
  }
}
