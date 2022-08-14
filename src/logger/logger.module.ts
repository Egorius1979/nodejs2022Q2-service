import { Module } from '@nestjs/common';
import { MyLogger } from './my-logger';

@Module({})
@Module({
  providers: [MyLogger],
  exports: [MyLogger],
})
export class LoggerModule {}
