import * as fs from 'fs';
import * as path from 'path';

export interface LoggerOptions {
  logDir: string;
  maxSizeBytes?: number;
  maxFiles?: number;
  prefix?: string;
}

export class RotatingLogger {
  private logDir: string;
  private maxSizeBytes: number;
  private maxFiles: number;
  private prefix: string;
  private currentFilePath: string;

  constructor(options: LoggerOptions) {
    this.logDir = options.logDir;
    this.maxSizeBytes = options.maxSizeBytes ?? 1024 * 1024;
    this.maxFiles = options.maxFiles ?? 5;
    this.prefix = options.prefix ?? 'app';
    this.currentFilePath = path.join(this.logDir, `${this.prefix}.log`);
    this.ensureDirectoryExists();
  }

  private ensureDirectoryExists(): void {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  private rotateLogsIfNeeded(): void {
    if (!fs.existsSync(this.currentFilePath)) return;

    const stats = fs.statSync(this.currentFilePath);
    if (stats.size < this.maxSizeBytes) return;

    const oldestFile = path.join(this.logDir, `${this.prefix}.${this.maxFiles}.log`);
    if (fs.existsSync(oldestFile)) {
      fs.unlinkSync(oldestFile);
    }

    for (let i = this.maxFiles - 1; i >= 1; i--) {
      const src = path.join(this.logDir, `${this.prefix}.${i}.log`);
      const dest = path.join(this.logDir, `${this.prefix}.${i + 1}.log`);
      if (fs.existsSync(src)) {
        fs.renameSync(src, dest);
      }
    }

    fs.renameSync(this.currentFilePath, path.join(this.logDir, `${this.prefix}.1.log`));
  }

  public log(message: string, level: 'INFO' | 'WARN' | 'ERROR' = 'INFO'): void {
    this.rotateLogsIfNeeded();
    const timestamp = new Date().toISOString();
    const formattedMessage = `[${timestamp}] [${level}] ${message}\n`;
    fs.appendFileSync(this.currentFilePath, formattedMessage, 'utf-8');
  }
}
