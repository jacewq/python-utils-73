import { createLogger, format, transports, Logger } from 'winston';
import 'winston-daily-rotate-file';

/**
 * Configuration for application logging using rotation
 */
export const getLogger = (serviceName: string): Logger => {
  return createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.json()
    ),
    defaultMeta: { service: serviceName },
    transports: [
      new transports.Console(),
      new transports.DailyRotateFile({
        filename: 'logs/%DATE%-application.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d'
      })
    ]
  });
};

export const logger = getLogger('python-utils-73');