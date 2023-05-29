import { ILogger } from '../../domain/logger/logger.internface';
import { UserM } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/user.repository';

export class getUserUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: number): Promise<UserM> {
    const result = await this.userRepository.findById(id);
    this.logger.log('getUserUseCases execute', 'User retrieved');
    return result;
  }
}
