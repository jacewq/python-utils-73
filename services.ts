import { execFileSync } from 'child_process';

export interface ExecutionOptions {
  timeoutMs?: number;
  pythonPath?: string;
  throwOnError?: boolean;
}

export interface ExecutionResult<T> {
  success: boolean;
  data: T | null;
  error: string | null;
  exitCode: number;
}

export class PythonRunnerService {
  private defaultPython: string;

  constructor(pythonPath: string = 'python3') {
    this.defaultPython = pythonPath;
  }

  /**
   * Executes a Python script synchronously with comprehensive edge-case handling.
   */
  public runScript<T = unknown>(
    scriptPath: string,
    args: string[] = [],
    options: ExecutionOptions = {}
  ): ExecutionResult<T> {
    const timeout = options.timeoutMs ?? 5000;
    const python = options.pythonPath ?? this.defaultPython;
    const throwOnError = options.throwOnError ?? false;

    // Validate script path before attempting execution
    if (!scriptPath || typeof scriptPath !== 'string' || scriptPath.trim() === '') {
      const errMessage = 'Invalid or empty script path provided';
      if (throwOnError) throw new Error(errMessage);
      return { success: false, data: null, error: errMessage, exitCode: -1 };
    }

    try {
      const output = execFileSync(python, [scriptPath, ...args], {
        timeout,
        encoding: 'utf-8',
        stdio: ['ignore', 'pipe', 'pipe'],
      });

      const trimmed = (output || '').trim();
      if (!trimmed) {
        return { success: true, data: null, error: null, exitCode: 0 };
      }

      // Attempt parsing standard JSON output from Python script
      try {
        const parsed = JSON.parse(trimmed) as T;
        return { success: true, data: parsed, error: null, exitCode: 0 };
      } catch {
        // Fallback to raw string if output is not valid JSON
        return { success: true, data: trimmed as unknown as T, error: null, exitCode: 0 };
      }
    } catch (err: unknown) {
      const errorObj = err as { message?: string; status?: number; stderr?: string };
      const stderrText = typeof errorObj.stderr === 'string' ? errorObj.stderr.trim() : '';
      const errorMessage = stderrText || errorObj.message || 'Unknown Python execution error';
      const exitCode = typeof errorObj.status === 'number' ? errorObj.status : -1;

      if (throwOnError) {
        throw new Error(`Python execution failed [code ${exitCode}]: ${errorMessage}`);
      }

      return {
        success: false,
        data: null,
        error: errorMessage,
        exitCode,
      };
    }
  }
}