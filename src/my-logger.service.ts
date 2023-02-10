import { Logger, ConsoleLogger, LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class MyLogger extends ConsoleLogger {
  constructor(context: string) { 
    super(context);  
    if (context === 'development') {
      this.setLogLevels(['log', 'warn', 'error', 'debug', 'verbose'])
    } else {
      this.setLogLevels(['error', 'warn'])
    }
  }
}

