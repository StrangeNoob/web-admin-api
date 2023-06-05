import { ApiProperty } from '@nestjs/swagger';
import { GroupM } from '../../../domain/model/group';
import { UserRole } from '../../../domain/model/role';

export class GroupPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  adminId: number;
  @ApiProperty()
  users: {
    id: number;
    username: string;
    role: UserRole;
  }[];

  constructor(group: GroupM) {
    this.id = group.id;
    this.adminId = group.admin.id;
    this.users = group.users.map(({ id, username, role }) => ({
      id,
      username,
      role,
    }));
  }
}
