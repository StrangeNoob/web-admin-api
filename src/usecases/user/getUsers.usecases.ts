import { ILogger } from '../../domain/logger/logger.internface';
import { UserM } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/user.repository';

export class getUsersUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(): Promise<UserM[]> {
    console.log(this.userRepository.findAll());
    const result = await this.userRepository.findAll();
    this.logger.log('getUsersUseCases execute', 'User retrieved');
    return result;
  }
}
