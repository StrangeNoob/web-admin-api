import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from '../../../infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../../infrastructure/usecases-proxy/usecases-proxy.module';
import { GroupPresenter } from './group.presenter';
import { ApiResponseType } from '../../../infrastructure/common/swagger/response.decorator';
import { getGroupUseCases } from '../../../usecases/group/getGroup.usecases';
import { getGroupsUseCases } from '../../../usecases/group/getGroups.usecases';
import { getGroupsByAdminUseCases } from '../../../usecases/group/getGroupByAdmin.usecases';
import { createGroupUseCases } from '../../../usecases/group/createGroup.usecases';
import { updateUserUseCases } from '../../../usecases/group/updateUser.usecases';
import { changeAdminUseCases } from '../../../usecases/group/changeAdmin.usecases';
import { deleteGroupUseCases } from '../../../usecases/group/deletGroup.usecases';
import {
  ChangeAdminGroupDto,
  CreateGroupDto,
  UpdateGroupDto,
} from './group.dto';

@Controller('group')
@ApiTags('group')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(GroupPresenter)
export class GroupController {
  constructor(
    @Inject(UsecasesProxyModule.GET_GROUP_USECASES_PROXY)
    private readonly getGroupUsecaseProxy: UseCaseProxy<getGroupUseCases>,
    @Inject(UsecasesProxyModule.GET_USERS_USECASES_PROXY)
    private readonly getAllGroupsUsecaseProxy: UseCaseProxy<getGroupsUseCases>,
    @Inject(UsecasesProxyModule.GET_GROUPS_BY_ADMIN_USECASES_PROXY)
    private readonly getGroupsByAdminUsecaseProxy: UseCaseProxy<getGroupsByAdminUseCases>,
    @Inject(UsecasesProxyModule.POST_GROUP_USECASES_PROXY)
    private readonly createGroupUsecaseProxy: UseCaseProxy<createGroupUseCases>,
    @Inject(UsecasesProxyModule.ADD_USER_TO_GROUP_USECASES_PROXY)
    private readonly updateUserUseCasesProxy: UseCaseProxy<updateUserUseCases>,
    @Inject(UsecasesProxyModule.CHANGE_ADMIN_USECASES_PROXY)
    private readonly changeAdminUseCasesProxy: UseCaseProxy<changeAdminUseCases>,
    @Inject(UsecasesProxyModule.DELETE_GROUP_USECASES_PROXY)
    private readonly deleteGroupUseCasesProxy: UseCaseProxy<deleteGroupUseCases>,
  ) {}

  @Get('/all')
  @ApiResponseType(GroupPresenter, true)
  async getGroups() {
    const users = await this.getAllGroupsUsecaseProxy.getInstance().execute();
    return users.map((user) => new GroupPresenter(user));
  }

  @Get('/admin')
  @ApiResponseType(GroupPresenter, true)
  async getGroupsByAdmin(@Query('id', ParseIntPipe) id: number) {
    const users = await this.getGroupsByAdminUsecaseProxy
      .getInstance()
      .execute(id);
    return users.map((user) => new GroupPresenter(user));
  }

  @Get(':id')
  @ApiResponseType(GroupPresenter, false)
  async getUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.getGroupUsecaseProxy.getInstance().execute(id);
    return new GroupPresenter(user);
  }

  @Delete(':id')
  @ApiResponseType(GroupPresenter, true)
  async deleteGroup(@Param('id', ParseIntPipe) id: number) {
    await this.deleteGroupUseCasesProxy.getInstance().execute(id);
    return 'success';
  }

  @Put(':id')
  @ApiResponseType(GroupPresenter, true)
  async addUserToGroup(
    @Param('id', ParseIntPipe) id: number,
    @Body() { user_id }: UpdateGroupDto,
  ) {
    const groupUpdated = await this.updateUserUseCasesProxy
      .getInstance()
      .execute(id, user_id);
    return new GroupPresenter(groupUpdated);
  }

  @Post('/changeAdmin')
  @ApiResponseType(GroupPresenter, true)
  async changeAdmin(@Body() changeAdminGroupDto: ChangeAdminGroupDto) {
    const { id, admin_id } = changeAdminGroupDto;
    const userCreated = await this.changeAdminUseCasesProxy
      .getInstance()
      .execute(id, admin_id);
    return new GroupPresenter(userCreated);
  }

  @Post('')
  @ApiResponseType(GroupPresenter, true)
  async addTodo(@Body() createGroupDto: CreateGroupDto) {
    const { admin_id } = createGroupDto;
    const userCreated = await this.createGroupUsecaseProxy
      .getInstance()
      .execute(admin_id);
    return new GroupPresenter(userCreated);
  }
}
