import {
  BadRequestException,
  ClassSerializerInterceptor,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './utils/filters/all-exception.filters';
import { BadRequestExceptionFilter } from './utils/filters/bad-request-exception.filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // forbidUnknownValues: false,
      transform: true,
      validateCustomDecorators: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // for  handle inject datasource of validator
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(
    ...[new HttpExceptionFilter(), new BadRequestExceptionFilter()],
  );
  await app.listen(3000);
}
bootstrap();
