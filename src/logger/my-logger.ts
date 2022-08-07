import { ConsoleLogger } from '@nestjs/common';
import { appendFileSync, statSync } from 'fs';

export class MyLogger extends ConsoleLogger {
  fileCount: number = 1;

  constructor() {
    super();
    this.context = 'MyCustomLogger';

    // this.options = { logLevels: ['error'] };
    // if (+process.env.LOG_LEVEL === 0) {
    //   // this.options = { logLevels: ['debug'] };
    //   this.setLogLevels(['debug']);
    // } else if (+process.env.LOG_LEVEL === 1) {
    //   this.setLogLevels(['debug', 'verbose']);
    //   // this.options = { logLevels: ['debug', 'verbose'] };
    // } else if (+process.env.LOG_LEVEL === 2) {
    //   this.setLogLevels(['debug', 'verbose', 'log']);
    //   // this.options = { logLevels: ['debug', 'verbose', 'log'] };
    // } else if (+process.env.LOG_LEVEL === 3) {
    //   this.setLogLevels(['debug', 'verbose', 'log', 'error']);
    //   // this.options = { logLevels: ['debug', 'verbose', 'log', 'error'] };
    // }

    // const filesArray = readdirSync('./logs');
    // const lastFile = filesArray.pop();
    // let num = 1;
    // if (lastFile) {
    //   num = +/\d+/.exec(lastFile);
    // }
    // this.fileCount = num;
  }

  writeToFile(log) {
    const file = `./logs/file${this.fileCount}.log`;
    appendFileSync(file, `\n${log}`);

    const statsObj = statSync(file);
    if (statsObj.size > +process.env.LOG_SIZE) {
      this.fileCount += 1;
    }
  }
}
