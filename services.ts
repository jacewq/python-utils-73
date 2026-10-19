export interface PythonProcessResult {
  exitCode: number;
  stdout: string;
  stderr: string;
}

/**
 * Orchestrates python script execution with basic result handling
 */
export class PythonExecutionService {
  private readonly binPath: string;

  constructor(binPath: string = 'python3') {
    this.binPath = binPath;
  }

  public formatCommand(scriptPath: string, args: string[] = []): string[] {
    return [this.binPath, scriptPath, ...args];
  }

  public validateEnvironment(result: PythonProcessResult): void {
    if (result.exitCode !== 0) {
      throw new Error(`Python execution failed: ${result.stderr}`);
    }
  }

  public parseOutput(stdout: string): Record<string, any> {
    try {
      return JSON.parse(stdout);
    } catch (e) {
      return { raw: stdout };
    }
  }
}

export const createService = (path?: string): PythonExecutionService => {
  return new PythonExecutionService(path);
};