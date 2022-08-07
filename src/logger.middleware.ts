import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { write } from 'fs';
import { MyLogger } from './logger/my-logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: MyLogger) {}
  // private logger: MyLogger;

  use(request: Request, response: Response, next: NextFunction): void {
    response.on('finish', () => {
      const { method, originalUrl, body } = request;
      const { statusCode, statusMessage } = response;
      const level = +process.env.LOG_LEVEL;

      const message = `${method}, endpoint: "${originalUrl}", status: ${statusCode} ${statusMessage}`;
      const ts = new Date().toISOString();

      const firstRes = this.logger.writeToFile(
        `[${ts}]: ${message}, body: ${JSON.stringify(body)}`,
      );
      const secondRes = this.logger.writeToFile(`[${ts}]: ${message}`);

      if (
        method !== 'GET' &&
        method !== 'DELETE' &&
        !originalUrl.startsWith('/favs')
      ) {
        if (statusCode >= 500) {
          if (level > 1) {
            firstRes;
            return this.logger.error(message, body);
          }
          return;
        }
        if (statusCode >= 400) {
          if (level > 0) {
            firstRes;
            return this.logger.warn(message, body);
          }
          return;
        }
        firstRes;
        return this.logger.log(message, body);
      }

      if (statusCode >= 500) {
        if (level > 1) {
          secondRes;
          return this.logger.error(message);
        }
        return;
      }
      if (statusCode >= 400) {
        if (level > 0) {
          secondRes;
          return this.logger.warn(message);
        }
        return;
      }
      secondRes;
      return this.logger.log(message);
    });

    next();
  }
}
