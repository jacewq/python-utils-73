import * as winston from 'winston';
import 'winston-daily-rotate-file';
import * as path from 'path';

/**
 * Logger configuration for python-utils-73
 * Uses daily rotation to manage disk space
 */
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.DailyRotateFile({
      filename: path.join('logs', 'application-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
});

export const logConfig = {
  defaultMeta: { service: 'python-utils-73' },
  exitOnError: false
};