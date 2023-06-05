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
} from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from '../../../infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../../infrastructure/usecases-proxy/usecases-proxy.module';
import { addUserUseCases } from '../../../usecases/user/addUser.usecases';
import { deleteUserUseCases } from '../../../usecases/user/deleteUser.usecases';
import { getUserUseCases } from '../../../usecases/user/getUser.usecases';
import { getUsersUseCases } from '../../../usecases/user/getUsers.usecases';
import { UserPresenter } from './user.presenter';
import { ApiResponseType } from '../../../infrastructure/common/swagger/response.decorator';
import { AddUserDto, ChangeUserRoleDto } from './user.dto';
import { changeUserRoleUseCases } from '../../../usecases/user/changeRole.usecases';

@Controller('user')
@ApiTags('user')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(UserPresenter)
export class UserController {
  constructor(
    @Inject(UsecasesProxyModule.GET_USER_USECASES_PROXY)
    private readonly getUserUsecaseProxy: UseCaseProxy<getUserUseCases>,
    @Inject(UsecasesProxyModule.GET_USERS_USECASES_PROXY)
    private readonly getAllUserUsecaseProxy: UseCaseProxy<getUsersUseCases>,
    @Inject(UsecasesProxyModule.DELETE_USER_USECASES_PROXY)
    private readonly deleteUserUsecaseProxy: UseCaseProxy<deleteUserUseCases>,
    @Inject(UsecasesProxyModule.POST_USER_USECASES_PROXY)
    private readonly addUserUsecaseProxy: UseCaseProxy<addUserUseCases>,
    @Inject(UsecasesProxyModule.CHANGE_USER_ROLE_USECASES_PROXY)
    private readonly changeUserRoleUseCasesProxy: UseCaseProxy<changeUserRoleUseCases>,
  ) {}

  @Get('all')
  @ApiResponseType(UserPresenter, true)
  async getUsers() {
    const users = await this.getAllUserUsecaseProxy.getInstance().execute();
    return users.map((user) => new UserPresenter(user));
  }

  @Get(':id')
  @ApiResponseType(UserPresenter, false)
  async getUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.getUserUsecaseProxy.getInstance().execute(id);
    return new UserPresenter(user);
  }

  @Delete(':id')
  @ApiResponseType(UserPresenter, true)
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.deleteUserUsecaseProxy.getInstance().execute(id);
    return 'success';
  }

  @Post('')
  @ApiResponseType(UserPresenter, true)
  async addUser(@Body() addUserDto: AddUserDto) {
    const { email } = addUserDto;
    const userCreated = await this.addUserUsecaseProxy
      .getInstance()
      .execute(email);
    return new UserPresenter(userCreated);
  }

  @Put(':id')
  @ApiResponseType(UserPresenter, true)
  async changeUserRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() { role }: ChangeUserRoleDto,
  ) {
    const updateUser = await this.changeUserRoleUseCasesProxy
      .getInstance()
      .execute(id, role);
    return new UserPresenter(updateUser);
  }
}
