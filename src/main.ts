import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { resolve } from 'path';
import { readFile } from 'fs/promises';
import { parse } from 'yaml';
import 'dotenv/config';
import { MyLogger } from './logger/my-logger';
// import { HttpExceptionFilter } from './http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: new MyLogger(),
    // logger: ['error'],
  });

  const DOC_API = await readFile(
    resolve(process.cwd(), 'doc', 'api.yaml'),
    'utf8',
  );
  const document = parse(DOC_API);

  SwaggerModule.setup('doc', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(process.env.PORT);

  // app.useGlobalFilters(new HttpExceptionFilter());
}
bootstrap();
