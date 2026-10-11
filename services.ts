import { spawn } from 'child_process';
import { EventEmitter } from 'events';

export interface ProcessOptions {
  pythonPath?: string;
  cwd?: string;
  env?: Record<string, string>;
  timeoutMs?: number;
}

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  exitCode: number | null;
}

export class PythonEnvironmentService extends EventEmitter {
  private readonly defaultPythonPath: string;

  constructor(defaultPythonPath: string = 'python3') {
    super();
    this.defaultPythonPath = defaultPythonPath;
  }

  /**
   * Executes a Python script with organized argument parsing and timeout handling.
   */
  public async runScript(
    scriptPath: string,
    args: string[] = [],
    options: ProcessOptions = {}
  ): Promise<ExecutionResult> {
    const pythonExecutable = options.pythonPath || this.defaultPythonPath;
    const fullArgs = [scriptPath, ...args];

    return new Promise((resolve, reject) => {
      const child = spawn(pythonExecutable, fullArgs, {
        cwd: options.cwd,
        env: { ...process.env, ...options.env },
      });

      let stdout = '';
      let stderr = '';
      let timer: NodeJS.Timeout | null = null;

      if (options.timeoutMs && options.timeoutMs > 0) {
        timer = setTimeout(() => {
          child.kill('SIGTERM');
          reject(new Error(`Execution timed out after ${options.timeoutMs}ms`));
        }, options.timeoutMs);
      }

      child.stdout.on('data', (chunk) => {
        stdout += chunk.toString();
      });

      child.stderr.on('data', (chunk) => {
        stderr += chunk.toString();
      });

      child.on('close', (code) => {
        if (timer) clearTimeout(timer);
        resolve({
          stdout: stdout.trim(),
          stderr: stderr.trim(),
          exitCode: code,
        });
      });

      child.on('error', (err) => {
        if (timer) clearTimeout(timer);
        reject(err);
      });
    });
  }
}