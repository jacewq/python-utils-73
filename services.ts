export interface PythonProcessConfig {
  executable: string;
  args: string[];
  env?: Record<string, string>;
}

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  exitCode: number | null;
}

/**
 * Executes a python script using the configured runtime environment.
 */
export async function runScript(scriptPath: string, config: PythonProcessConfig): Promise<ExecutionResult> {
  const { spawn } = require('child_process');

  return new Promise((resolve, reject) => {
    const child = spawn(config.executable, [scriptPath, ...config.args], { env: config.env });
    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data: Buffer) => (stdout += data.toString()));
    child.stderr.on('data', (data: Buffer) => (stderr += data.toString()));

    child.on('close', (code: number | null) => {
      resolve({ stdout, stderr, exitCode: code });
    });

    child.on('error', (err: Error) => {
      reject(err);
    });
  });
}

/**
 * Validates script existence before execution.
 */
export function validateScriptPath(path: string): boolean {
  const fs = require('fs');
  return fs.existsSync(path) && path.endsWith('.py');
}