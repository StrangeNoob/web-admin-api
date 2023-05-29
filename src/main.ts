import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionFilter } from './infrastructure/common/filter/expection.filter';
import { LoggerService } from './infrastructure/logger/logger.service';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './infrastructure/common/interceptors/logger.interceptor';
import {
  ResponseFormat,
  ResponseInterceptor,
} from './infrastructure/common/interceptors/response.interceptor';

async function bootstrap() {
  const env = process.env.NODE_ENV;

  const app = await NestFactory.create(AppModule);

  //Filters
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));

  // pipes
  app.useGlobalPipes(new ValidationPipe());

  // interceptors
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
  app.useGlobalInterceptors(new ResponseInterceptor());

  // swagger config
  if (env !== 'production') {
    const config = new DocumentBuilder()
      .addCookieAuth()
      .setTitle('Web Admin Api')
      .setDescription('API List')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      extraModels: [ResponseFormat],
      deepScanRoutes: true,
    });
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(3000);
}
bootstrap();
