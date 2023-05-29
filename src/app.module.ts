import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { UsecasesProxyModule } from './infrastructure/usecases-proxy/usecases-proxy.module';
import { ControllerModule } from './infrastructure/controller/controller.module';

@Module({
  imports: [
    EnvironmentConfigModule,
    LoggerModule,
    ExceptionsModule,
    UsecasesProxyModule.register(),
    ControllerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
