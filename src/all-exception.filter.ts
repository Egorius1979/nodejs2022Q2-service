import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { appendFileSync, statSync } from 'fs';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  fileCount: number = 1;
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);

    if (+process.env.LOG_LEVEL > 1) {
      this.writeToFile(JSON.stringify(responseBody));
    }
  }

  writeToFile(log) {
    const file = `./logs/error${this.fileCount}.log`;
    appendFileSync(file, `\n${log}`);

    const statsObj = statSync(file);
    if (statsObj.size > +process.env.LOG_SIZE) {
      this.fileCount += 1;
    }
  }
}
