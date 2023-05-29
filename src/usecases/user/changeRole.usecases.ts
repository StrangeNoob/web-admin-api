import { UserRole } from '../../domain/model/role';
import { ILogger } from '../../domain/logger/logger.internface';
import { UserM } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/user.repository';

export class changeUserRoleUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: number, role: UserRole): Promise<UserM> {
    const result = await this.userRepository.changeUserRole(id, role);
    this.logger.log('addUserUseCases execute', 'New User have been inserted');
    return result;
  }
}
