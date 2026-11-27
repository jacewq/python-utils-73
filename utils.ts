import * as fs from 'fs';
import * as path from 'path';

interface LoggerOptions {
  logDir: string;
  maxSizeMB: number;
  maxFiles: number;
}

/**
 * Configures a basic rotation-based file logger
 */
export const setupLogger = (options: LoggerOptions) => {
  if (!fs.existsSync(options.logDir)) {
    fs.mkdirSync(options.logDir, { recursive: true });
  }

  const logFile = path.join(options.logDir, 'app.log');

  return (message: string) => {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}\n`;

    if (fs.existsSync(logFile)) {
      const stats = fs.statSync(logFile);
      if (stats.size > options.maxSizeMB * 1024 * 1024) {
        for (let i = options.maxFiles - 1; i > 0; i--) {
          const oldFile = path.join(options.logDir, `app.${i}.log`);
          const newFile = path.join(options.logDir, `app.${i - 1}.log`);
          if (fs.existsSync(newFile)) fs.renameSync(newFile, oldFile);
        }
        fs.renameSync(logFile, path.join(options.logDir, 'app.1.log'));
      }
    }

    fs.appendFileSync(logFile, logEntry);
  };
};