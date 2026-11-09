import * as fs from 'fs';
import * as path from 'path';

export interface LoggerOptions {
  logDir: string;
  filename?: string;
  maxSizeBytes?: number;
  maxFiles?: number;
}

export class RotatingLogger {
  private logDir: string;
  private filename: string;
  private maxSizeBytes: number;
  private maxFiles: number;

  constructor(options: LoggerOptions) {
    this.logDir = options.logDir;
    this.filename = options.filename || 'app.log';
    this.maxSizeBytes = options.maxSizeBytes || 1024 * 1024;
    this.maxFiles = options.maxFiles || 5;

    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  private getFilePath(): string {
    return path.join(this.logDir, this.filename);
  }

  private rotate(): void {
    const basePath = this.getFilePath();
    if (!fs.existsSync(basePath)) return;

    const oldestFile = `${basePath}.${this.maxFiles}`;
    if (fs.existsSync(oldestFile)) {
      fs.unlinkSync(oldestFile);
    }

    for (let i = this.maxFiles - 1; i >= 1; i--) {
      const current = `${basePath}.${i}`;
      const next = `${basePath}.${i + 1}`;
      if (fs.existsSync(current)) {
        fs.renameSync(current, next);
      }
    }

    fs.renameSync(basePath, `${basePath}.1`);
  }

  private checkRotation(): void {
    const filePath = this.getFilePath();
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      if (stats.size >= this.maxSizeBytes) {
        this.rotate();
      }
    }
  }

  public log(level: 'INFO' | 'WARN' | 'ERROR', message: string): void {
    this.checkRotation();
    const timestamp = new Date().toISOString();
    const formatted = `[${timestamp}] [${level}] ${message}\n`;
    fs.appendFileSync(this.getFilePath(), formatted, 'utf-8');
  }

  public info(message: string): void {
    this.log('INFO', message);
  }

  public warn(message: string): void {
    this.log('WARN', message);
  }

  public error(message: string): void {
    this.log('ERROR', message);
  }
}