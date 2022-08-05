import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { resolve } from 'path';
import { readFile } from 'fs/promises';
import { parse } from 'yaml';
import 'dotenv/config';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const DOC_API = await readFile(
    resolve(process.cwd(), 'doc', 'api.yaml'),
    'utf8',
  );
  const document = parse(DOC_API);

  SwaggerModule.setup('doc', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // const reflector = new Reflector();
  // app.useGlobalGuards(new JwtAuthGuard(reflector));
  await app.listen(process.env.PORT);
}
bootstrap();
