import { ApiProperty } from '@nestjs/swagger';
import { UserM } from '../../../domain/model/user';
import { GroupM } from '../../../domain/model/group';

export class GroupPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  admin_id: UserM;
  @ApiProperty()
  users: UserM[];

  constructor(group: GroupM) {
    this.id = group.id;
    this.admin_id = group.admin_id;
    this.users = group.users;
  }
}
