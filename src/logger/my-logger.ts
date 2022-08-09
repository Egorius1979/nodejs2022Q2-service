import { ConsoleLogger } from '@nestjs/common';
import { appendFileSync, statSync, mkdirSync, existsSync } from 'fs';

export class MyLogger extends ConsoleLogger {
  fileCount: number = 1;

  constructor() {
    super();
    this.context = 'MyCustomLogger';
  }

  writeToFile(log) {
    if (!existsSync('./logs')) {
      mkdirSync('./logs');
    }
    const file = `./logs/file${this.fileCount}.log`;
    appendFileSync(file, `\n${log}`);

    const statsObj = statSync(file);
    if (statsObj.size > +process.env.LOG_SIZE) {
      this.fileCount += 1;
    }
  }
}
