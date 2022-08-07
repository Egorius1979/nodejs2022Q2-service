import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MyLogger } from './logger/my-logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: MyLogger) {}

  use(request: Request, response: Response, next: NextFunction): void {
    response.on('finish', () => {
      const { method, originalUrl, body } = request;
      const { statusCode, statusMessage } = response;

      const message = `${method}, endpoint: "${originalUrl}", status: ${statusCode} ${statusMessage}`;
      const ts = new Date();

      if (
        method !== 'GET' &&
        method !== 'DELETE' &&
        !originalUrl.startsWith('/favs')
      ) {
        if (statusCode >= 500) {
          return this.logger.error(message, body);
        }
        if (statusCode >= 400) {
          return this.logger.warn(message, body);
        }
        this.logger.writeToFile(
          `[${ts}]: ${message}, body: ${JSON.stringify(body)}`,
        );
        return this.logger.log(message, body);
      }

      if (statusCode >= 500) {
        return this.logger.error(message);
      }

      if (statusCode >= 400) {
        return this.logger.warn(message);
      }
      this.logger.writeToFile(`[${ts}]: ${message}`);
      return this.logger.log(message);
    });

    next();
  }
}
