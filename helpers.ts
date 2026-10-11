import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { resolve } from 'path';

/**
 * Configures a rotating file logger for system operations
 */
export const setupLogger = (logDir: string = 'logs') => {
  const transport = new winston.transports.DailyRotateFile({
    dirname: resolve(logDir),
    filename: 'app-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
  });

  return winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    transports: [
      transport,
      new winston.transports.Console({
        format: winston.format.simple()
      })
    ]
  });
};

export const logger = setupLogger();