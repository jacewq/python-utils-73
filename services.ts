export interface PythonConfig {
  interpreterPath: string;
  version: string;
  environment: string;
}

/**
 * Executes a python script via child process and returns stdout
 */
export async function executeScript(scriptPath: string, args: string[], config: PythonConfig): Promise<string> {
  const { spawn } = await import('node:child_process');

  return new Promise((resolve, reject) => {
    const process = spawn(config.interpreterPath, [scriptPath, ...args]);
    let data = '';
    let error = '';

    process.stdout.on('data', (chunk: Buffer) => {
      data += chunk.toString();
    });

    process.stderr.on('data', (chunk: Buffer) => {
      error += chunk.toString();
    });

    process.on('close', (code: number) => {
      if (code !== 0) {
        reject(new Error(`python process exited with code ${code}: ${error}`));
      } else {
        resolve(data.trim());
      }
    });
  });
}

/**
 * Validates environment configuration strings
 */
export function validateConfig(config: PythonConfig): boolean {
  return !!config.interpreterPath && !!config.version;
}