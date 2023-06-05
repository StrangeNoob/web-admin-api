import { UserRole } from '../../domain/model/role';
import { UserM } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/user.repository';

export class changeUserRoleUseCases {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number, role: UserRole): Promise<UserM> {
    console.log(role);
    const result = await this.userRepository.changeUserRole(id, role);
    return result;
  }
}
