import * as fs from 'fs';
import * as path from 'path';

interface LoggerOptions {
  logDir: string;
  maxSizeBytes: number;
  maxFiles: number;
}

export const setupLogger = (options: LoggerOptions) => {
  if (!fs.existsSync(options.logDir)) {
    fs.mkdirSync(options.logDir, { recursive: true });
  }

  const logFilePath = path.join(options.logDir, 'app.log');

  const rotateLogs = () => {
    if (fs.existsSync(logFilePath) && fs.statSync(logFilePath).size >= options.maxSizeBytes) {
      for (let i = options.maxFiles - 1; i >= 0; i--) {
        const oldFile = i === 0 ? logFilePath : `${logFilePath}.${i}`;
        const newFile = `${logFilePath}.${i + 1}`;
        if (fs.existsSync(oldFile)) fs.renameSync(oldFile, newFile);
      }
    }
  };

  return {
    log: (message: string) => {
      rotateLogs();
      const entry = `[${new Date().toISOString()}] ${message}\n`;
      fs.appendFileSync(logFilePath, entry);
    }
  };
};
