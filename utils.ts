import * as winston from 'winston';
import 'winston-daily-rotate-file';

/**
 * Configures a rotating file logger for system operations.
 * Rotates daily and retains logs for 14 days.
 */
export const setupLogger = (logDir: string = 'logs') => {
  const transport = new winston.transports.DailyRotateFile({
    dirname: logDir,
    filename: 'app-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    level: 'info'
  });

  const logger = winston.createLogger({
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

  return logger;
};