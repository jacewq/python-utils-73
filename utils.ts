import * as winston from 'winston';
import 'winston-daily-rotate-file';

/**
 * Configures a rotating file logger for system operations.
 * Logs are stored in /logs and rotated daily.
 */
export const createLogger = (serviceName: string) => {
  const transport = new winston.transports.DailyRotateFile({
    filename: `logs/${serviceName}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
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
        format: winston.format.simple(),
      }),
    ],
  });
};

export const logger = createLogger('python-utils-73');