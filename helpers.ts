import * as fs from 'fs';
import * as path from 'path';

export type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

export interface LoggerConfig {
  logDir: string;
  filename: string;
  maxSizeBytes: number;
  maxFiles: number;
  minLevel?: LogLevel;
}

const LOG_LEVELS: Record<LogLevel, number> = {
  DEBUG: 10,
  INFO: 20,
  WARN: 30,
  ERROR: 40,
};

export class RotatingLogger {
  private config: Required<LoggerConfig>;
  private filePath: string;

  constructor(config: LoggerConfig) {
    this.config = { minLevel: 'INFO', ...config };
    this.filePath = path.join(this.config.logDir, this.config.filename);
    if (!fs.existsSync(this.config.logDir)) {
      fs.mkdirSync(this.config.logDir, { recursive: true });
    }
  }

  private rotateIfNeeded(): void {
    if (!fs.existsSync(this.filePath)) return;
    const stats = fs.statSync(this.filePath);
    if (stats.size < this.config.maxSizeBytes) return;

    for (let i = this.config.maxFiles - 1; i >= 1; i--) {
      const src = `${this.filePath}.${i}`;
      const dest = `${this.filePath}.${i + 1}`;
      if (fs.existsSync(src)) {
        if (i + 1 > this.config.maxFiles) {
          fs.unlinkSync(src);
        } else {
          fs.renameSync(src, dest);
        }
      }
    }
    fs.renameSync(this.filePath, `${this.filePath}.1`);
  }

  public log(level: LogLevel, message: string): void {
    if (LOG_LEVELS[level] < LOG_LEVELS[this.config.minLevel]) return;

    this.rotateIfNeeded();
    const timestamp = new Date().toISOString();
    const line = `[${timestamp}] [${level}] ${message}\n`;
    fs.appendFileSync(this.filePath, line, 'utf-8');
  }

  public info(msg: string): void { this.log('INFO', msg); }
  public warn(msg: string): void { this.log('WARN', msg); }
  public error(msg: string): void { this.log('ERROR', msg); }
  public debug(msg: string): void { this.log('DEBUG', msg); }
}