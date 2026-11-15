import * as fs from 'fs';
import * as path from 'path';

/**
 * Minimal rotating logger for python-utils-73
 */
export interface LoggerOptions {
  logDir: string;
  maxSizeBytes: number;
}

export const setupLogger = (options: LoggerOptions) => {
  const logFile = path.join(options.logDir, 'app.log');
  
  if (!fs.existsSync(options.logDir)) {
    fs.mkdirSync(options.logDir, { recursive: true });
  }

  return (message: string) => {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}\n`;

    if (fs.existsSync(logFile)) {
      const stats = fs.statSync(logFile);
      if (stats.size > options.maxSizeBytes) {
        const backupPath = `${logFile}.${Date.now()}.old`;
        fs.renameSync(logFile, backupPath);
      }
    }

    fs.appendFileSync(logFile, logEntry);
  };
};

// Usage Example:
// const log = setupLogger({ logDir: './logs', maxSizeBytes: 1024 * 1024 });
// log('Application started');