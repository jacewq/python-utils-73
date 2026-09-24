import { createLogger, format, transports, Logger } from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';

/**
 * Configuration for rotating log files.
 * Ensures logs are stored in the logs/ directory with daily rotation.
 */
export const createApplicationLogger = (serviceName: string): Logger => {
  return createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.errors({ stack: true }),
      format.json()
    ),
    defaultMeta: { service: serviceName },
    transports: [
      new transports.Console({
        format: format.combine(format.colorize(), format.simple())
      }),
      new (transports as any).DailyRotateFile({
        filename: path.join('logs', `${serviceName}-%DATE%.log`),
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d'
      })
    ]
  });
};

export const logger = createApplicationLogger('python-utils-73');