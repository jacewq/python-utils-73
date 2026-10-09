import * as fs from 'fs';
import * as path from 'path';

interface LoggerOptions {
  logDir: string;
  maxSizeMB: number;
  maxFiles: number;
}

export const setupLogger = (options: LoggerOptions) => {
  const logPath = path.join(options.logDir, 'app.log');

  if (!fs.existsSync(options.logDir)) {
    fs.mkdirSync(options.logDir, { recursive: true });
  }

  const rotateLogs = () => {
    if (fs.existsSync(logPath)) {
      const stats = fs.statSync(logPath);
      if (stats.size > options.maxSizeMB * 1024 * 1024) {
        for (let i = options.maxFiles - 1; i > 0; i--) {
          const oldFile = `${logPath}.${i}`;
          const nextFile = `${logPath}.${i + 1}`;
          if (fs.existsSync(oldFile)) fs.renameSync(oldFile, nextFile);
        }
        fs.renameSync(logPath, `${logPath}.1`);
      }
    }
  };

  return {
    log: (message: string) => {
      rotateLogs();
      const entry = `[${new Date().toISOString()}] ${message}\n`;
      fs.appendFileSync(logPath, entry);
    }
  };
};