export interface PythonProcessResult {
  stdout: string;
  stderr: string;
  exitCode: number | null;
}

/**
 * executes python scripts using local runtime
 */
export async function executePythonScript(scriptPath: string, args: string[] = []): Promise<PythonProcessResult> {
  const { spawn } = await import('node:child_process');

  return new Promise((resolve, reject) => {
    const python = spawn('python3', [scriptPath, ...args]);
    let stdout = '';
    let stderr = '';

    python.stdout.on('data', (data) => { stdout += data.toString(); });
    python.stderr.on('data', (data) => { stderr += data.toString(); });

    python.on('close', (code) => {
      resolve({ stdout, stderr, exitCode: code });
    });

    python.on('error', (err) => {
      reject(err);
    });
  });
}

export const formatPythonOutput = (output: string): string[] => {
  return output.trim().split('\n').filter(Boolean);
};

export const validateExitStatus = (code: number | null): boolean => {
  return code === 0;
};