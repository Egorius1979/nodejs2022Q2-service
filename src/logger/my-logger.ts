import { ConsoleLogger } from '@nestjs/common';

export class MyLogger extends ConsoleLogger {
  constructor() {
    super();
    this.context = 'MyCustomLogger';
    // this.options = { logLevels: ['log'], timestamp: true };
  }
}
