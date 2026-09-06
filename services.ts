import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  exitCode: number;
}

export class PythonExecutionError extends Error {
  constructor(
    message: string,
    public readonly stderr: string,
    public readonly code?: number | string
  ) {
    super(message);
    this.name = 'PythonExecutionError';
  }
}

export class PythonExecutionService {
  private pythonPath: string;

  constructor(pythonPath: string = 'python3') {
    if (!pythonPath || !pythonPath.trim()) {
      throw new Error('Python executable path cannot be empty');
    }
    this.pythonPath = pythonPath.trim();
  }

  /**
   * Safely executes a Python script with robust error handling for edge cases.
   */
  async runScript(scriptPath: string, args: string[] = [], timeoutMs: number = 5000): Promise<ExecutionResult> {
    if (!scriptPath || !scriptPath.trim()) {
      throw new Error('Script path must be a valid, non-empty string');
    }

    try {
      const { stdout, stderr } = await execFileAsync(this.pythonPath, [scriptPath, ...args], {
        timeout: timeoutMs,
        killSignal: 'SIGTERM',
      });

      return {
        stdout: stdout.trim(),
        stderr: stderr.trim(),
        exitCode: 0,
      };
    } catch (error: any) {
      if (error.signal === 'SIGTERM' || error.killed) {
        throw new PythonExecutionError(
          `Python script execution timed out after ${timeoutMs}ms`,
          error.stderr || '',
          'TIMEOUT'
        );
      }

      if (error.code === 'ENOENT') {
        throw new PythonExecutionError(
          `Python executable not found at: ${this.pythonPath}`,
          error.message || '',
          'ENOENT'
        );
      }

      throw new PythonExecutionError(
        `Python script failed with exit code ${error.code ?? 'unknown'}`,
        error.stderr || error.message || '',
        error.code
      );
    }
  }
}