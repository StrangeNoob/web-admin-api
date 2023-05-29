import { ILogger } from '../../domain/logger/logger.internface';
import { UserM } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/user.repository';

export class addUserUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(email: string): Promise<UserM> {
    const user = new UserM();
    user.username = email;
    console.log(this.userRepository);
    const result = await this.userRepository.insert(user);
    this.logger.log('addUserUseCases execute', 'New User have been inserted');
    return result;
  }
}
