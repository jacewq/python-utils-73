import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

/**
 * Configuration options for executing Python scripts.
 */
export interface PythonExecutionOptions {
  /** The python command to use, defaults to 'python3' */
  pythonPath?: string;
  /** Environment variables to pass to the script */
  env?: Record<string, string>;
  /** Timeout in milliseconds for execution */
  timeout?: number;
}

/**
 * Result structure of a Python execution service call.
 */
export interface PythonExecutionResult {
  /** Standard output from the execution */
  stdout: string;
  /** Standard error output from the execution */
  stderr: string;
  /** Exit code of the process */
  code?: number;
}

/**
 * Service to execute Python commands and inline expressions from Node/TypeScript.
 */
export class PythonExecutionService {
  private pythonPath: string;

  /**
   * Initializes the python execution service with basic options.
   * @param options Configuration for the python execution environment.
   */
  constructor(options: PythonExecutionOptions = {}) {
    this.pythonPath = options.pythonPath || 'python3';
  }

  /**
   * Evaluates a simple inline Python expression and returns the output.
   * @param expression The Python code block to execute (e.g. "print('hello')")
   * @param options Execution overrides for this run
   * @returns A promise resolving to the execution result
   */
  async evaluateExpression(
    expression: string,
    options?: PythonExecutionOptions
  ): Promise<PythonExecutionResult> {
    const currentPython = options?.pythonPath || this.pythonPath;
    const env = { ...process.env, ...(options?.env || {}) };
    const timeout = options?.timeout || 10000;

    try {
      const escapedExpression = expression.replace(/"/g, '\\"');
      const command = `${currentPython} -c "${escapedExpression}"`;
      
      const { stdout, stderr } = await execAsync(command, { env, timeout });
      
      return {
        stdout: stdout.trim(),
        stderr: stderr.trim(),
        code: 0
      };
    } catch (error: any) {
      return {
        stdout: '',
        stderr: error.stderr || error.message || 'Unknown error occurred',
        code: error.code || 1
      };
    }
  }
}