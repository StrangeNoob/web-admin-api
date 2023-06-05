import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiExtraModels } from '@nestjs/swagger';
import { ApiResponseType } from '../../common/swagger/response.decorator';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { addTransactionUsecases } from '../../../usecases/transaction/addTransaction.usecase';
import { deleteTransactionUsecases } from '../../../usecases/transaction/deleteTransaction.usecase';
import { getTransactionUsecases } from '../../../usecases/transaction/getTransaction.usecase';
import { getTransactionByUserUsecases } from '../../../usecases/transaction/getTransactionByUserId.usecases';
import { getTransactionsUsecases } from '../../../usecases/transaction/getTransactions.usecase';
import { TransactionPresenter } from './transaction.presenter';
import { AddTransactionDto } from './transaction.dto';

@Controller('transaction')
@ApiTags('transaction')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(TransactionPresenter)
export class TransactionController {
  constructor(
    @Inject(UsecasesProxyModule.GET_TRANSACTION_USECASES_PROXY)
    private readonly getTransactionUsecaseProxy: UseCaseProxy<getTransactionUsecases>,
    @Inject(UsecasesProxyModule.GET_TRANSACTIONS_USECASES_PROXY)
    private readonly getAllTransactionsUsecaseProxy: UseCaseProxy<getTransactionsUsecases>,
    @Inject(UsecasesProxyModule.GET_TRANSACTIONS_BY_USER_USECASES_PROXY)
    private readonly getTransactionByUserUsecaseProxy: UseCaseProxy<getTransactionByUserUsecases>,
    @Inject(UsecasesProxyModule.DELETE_TRANSACTION_USECASES_PROXY)
    private readonly deleteTransactionUsecaseProxy: UseCaseProxy<deleteTransactionUsecases>,
    @Inject(UsecasesProxyModule.POST_TRANSACTION_USECASES_PROXY)
    private readonly addTransactionUsecaseProxy: UseCaseProxy<addTransactionUsecases>,
  ) {}
  @Get('/all')
  @ApiResponseType(TransactionPresenter, true)
  async getTransactions() {
    const transactions = await this.getAllTransactionsUsecaseProxy
      .getInstance()
      .execute();
    return transactions.map(
      (transaction) => new TransactionPresenter(transaction),
    );
  }

  @Get('/user')
  @ApiResponseType(TransactionPresenter, true)
  async getTransactionsByUser(@Query('id', ParseIntPipe) id: number) {
    const users = await this.getTransactionByUserUsecaseProxy
      .getInstance()
      .execute(id);
    return users.map((user) => new TransactionPresenter(user));
  }

  @Get(':id')
  @ApiResponseType(TransactionPresenter, false)
  async getUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.getTransactionUsecaseProxy
      .getInstance()
      .execute(id);
    return new TransactionPresenter(user);
  }

  @Delete(':id')
  @ApiResponseType(TransactionPresenter, true)
  async deleteTransaction(@Param('id', ParseIntPipe) id: number) {
    await this.deleteTransactionUsecaseProxy.getInstance().execute(id);
    return 'success';
  }

  @Post('')
  @ApiResponseType(TransactionPresenter, true)
  async addTransaction(@Body() addTransactionDto: AddTransactionDto) {
    const { content, userId } = addTransactionDto;
    const userCreated = await this.addTransactionUsecaseProxy
      .getInstance()
      .execute(content, userId);
    return new TransactionPresenter(userCreated);
  }
}
