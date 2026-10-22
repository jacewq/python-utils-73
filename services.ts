export interface PythonProcessResult {
  stdout: string;
  stderr: string;
  exitCode: number;
}

export const executeScript = async (path: string, args: string[] = []): Promise<PythonProcessResult> => {
  const { spawn } = await import('node:child_process');

  return new Promise((resolve, reject) => {
    const process = spawn('python3', [path, ...args]);
    let stdout = '';
    let stderr = '';

    process.stdout.on('data', (data) => { stdout += data; });
    process.stderr.on('data', (data) => { stderr += data; });

    process.on('close', (code) => {
      resolve({ stdout, stderr, exitCode: code || 0 });
    });

    process.on('error', (err) => {
      reject(err);
    });
  });
};

export const formatPath = (path: string): string => {
  return path.trim().replace(/^['"]|['"]$/g, '');
};

export const validatePythonEnv = async (): Promise<boolean> => {
  try {
    const result = await executeScript('-c', ['import sys; print(sys.version)']);
    return result.exitCode === 0;
  } catch {
    return false;
  }
};