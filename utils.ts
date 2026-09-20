import * as fs from 'fs';
import * as path from 'path';

interface LoggerConfig {
  logDir: string;
  maxSizeMb: number;
}

/**
 * Logs messages to a rotating file system
 */
export function setupRotatingLogger(config: LoggerConfig) {
  if (!fs.existsSync(config.logDir)) {
    fs.mkdirSync(config.logDir, { recursive: true });
  }

  const logFilePath = path.join(config.logDir, 'app.log');

  return (message: string) => {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}\n`;

    if (fs.existsSync(logFilePath)) {
      const stats = fs.statSync(logFilePath);
      if (stats.size > config.maxSizeMb * 1024 * 1024) {
        const backupPath = `${logFilePath}.${Date.now()}.old`;
        fs.renameSync(logFilePath, backupPath);
      }
    }

    fs.appendFileSync(logFilePath, logEntry);
  };
}

export const logger = setupRotatingLogger({
  logDir: './logs',
  maxSizeMb: 5
});