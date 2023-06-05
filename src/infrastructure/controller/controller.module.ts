import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { GroupController } from './group/group.controller';
import { TransactionController } from './transaction/transaction.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [UserController, GroupController, TransactionController],
})
export class ControllerModule {}
