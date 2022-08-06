// import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   private logger = new Logger('HTTP');

//   use(request: Request, response: Response, next: NextFunction): void {
//     const { ip, method, originalUrl } = request;
//     const userAgent = request.get('user-agent') || '';

//     response.on('finish', () => {
//       const { statusCode } = response;
//       const contentLength = response.get('content-length');

//       this.logger.log(
//         `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
//       );

//       if (method !== 'GET') {
//         this.logger.error(request.body);
//       }
//     });

//     next();
//   }
// }

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MyLogger } from './logger/my-logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // private readonly logger = new Logger('HTTP');
  constructor(private logger: MyLogger) {}

  use(request: Request, response: Response, next: NextFunction): void {
    //     const { ip, method, originalUrl } = request;
    //     const userAgent = request.get('user-agent') || '';

    //     response.on('finish', () => {
    //       const { statusCode } = response;
    //       const contentLength = response.get('content-length');

    //       this.logger.log(
    //         `${method} ${originalUrl} ${statusCode} ${contentLength}`,
    //       );

    //       if (method !== 'GET' && method !== 'DELETE') {
    //         this.logger.log(request.body);
    //       }
    //     });

    //     next();
    //   }
    // }

    response.on('finish', () => {
      const { method, originalUrl } = request;
      const { statusCode, statusMessage } = response;

      const message = `${method}, endpoint: "${originalUrl}", status: ${statusCode} ${statusMessage}`;

      if (
        method !== 'GET' &&
        method !== 'DELETE' &&
        !originalUrl.startsWith('/favs')
      ) {
        if (statusCode >= 500) {
          return this.logger.error(message, request.body);
        }

        if (statusCode >= 400) {
          return this.logger.warn(message, request.body);
        }
        return this.logger.log(message, request.body);
      }

      if (statusCode >= 500) {
        return this.logger.error(message);
      }

      if (statusCode >= 400) {
        return this.logger.warn(message);
      }

      return this.logger.log(message);
    });

    next();
  }
}
