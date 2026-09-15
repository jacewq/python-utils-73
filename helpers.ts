import * as fs from 'fs';
import * as path from 'path';

export type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

export interface LoggerOptions {
  logDir: string;
  maxSizeBytes?: number;
  maxFiles?: number;
}

/**
 * Lightweight file logger with size-based log file rotation.
 */
export class RotatingLogger {
  private readonly logDir: string;
  private readonly maxSizeBytes: number;
  private readonly maxFiles: number;
  private readonly currentFilePath: string;

  constructor(options: LoggerOptions) {
    this.logDir = options.logDir;
    this.maxSizeBytes = options.maxSizeBytes ?? 1024 * 1024; // 1MB default
    this.maxFiles = options.maxFiles ?? 5;
    this.currentFilePath = path.join(this.logDir, 'app.log');
    this.ensureDirExists();
  }

  private ensureDirExists(): void {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  private rotateIfNeeded(): void {
    if (!fs.existsSync(this.currentFilePath)) return;
    
    const stats = fs.statSync(this.currentFilePath);
    if (stats.size < this.maxSizeBytes) return;

    for (let i = this.maxFiles - 1; i >= 1; i--) {
      const oldPath = path.join(this.logDir, `app.${i}.log`);
      const newPath = path.join(this.logDir, `app.${i + 1}.log`);
      if (fs.existsSync(oldPath)) {
        if (i + 1 > this.maxFiles) {
          fs.unlinkSync(oldPath);
        } else {
          fs.renameSync(oldPath, newPath);
        }
      }
    }
    fs.renameSync(this.currentFilePath, path.join(this.logDir, 'app.1.log'));
  }

  public log(level: LogLevel, message: string): void {
    this.rotateIfNeeded();
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] [${level}] ${message}\n`;
    fs.appendFileSync(this.currentFilePath, entry, 'utf-8');
  }

  public info(msg: string): void { this.log('INFO', msg); }
  public warn(msg: string): void { this.log('WARN', msg); }
  public error(msg: string): void { this.log('ERROR', msg); }
  public debug(msg: string): void { this.log('DEBUG', msg); }
}