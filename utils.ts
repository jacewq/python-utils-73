import * as winston from 'winston';
import 'winston-daily-rotate-file';

/**
 * Configure Winston logger with daily file rotation.
 * Keeps logs for 14 days and limits size to 20MB per file.
 */
export const createLogger = (serviceName: string) => {
  return winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    defaultMeta: { service: serviceName },
    transports: [
      new winston.transports.Console({
        format: winston.format.simple()
      }),
      new winston.transports.DailyRotateFile({
        filename: 'logs/%DATE%-combined.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d'
      }),
      new winston.transports.DailyRotateFile({
        level: 'error',
        filename: 'logs/%DATE%-error.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d'
      })
    ]
  });
};

export const logger = createLogger('python-utils-73');