/**
 * Utility functions for python-utils-73
 */

export interface ProcessResult {
  success: boolean;
  output: string;
  error?: string;
}

/**
 * Cleans string output from python execution environments
 */
export const sanitizeOutput = (data: unknown): string => {
  if (typeof data !== 'string') {
    return String(data ?? '');
  }
  return data.trim().replace(/\r\n/g, '\n');
};

/**
 * Validates script execution status
 */
export const validateExecution = (code: number, stderr: string): ProcessResult => {
  const success = code === 0;
  return {
    success,
    output: '',
    error: success ? undefined : stderr || 'Unknown execution error'
  };
};

/**
 * Groups python library path definitions
 */
export const getPythonLibPath = (base: string, env: string = 'prod'): string => {
  const paths: Record<string, string> = {
    prod: '/usr/local/lib/python3.10/site-packages',
    dev: './venv/lib/python3.10/site-packages'
  };
  return `${base}/${paths[env] || paths.prod}`;
};

/**
 * Orchestrates sequential module processing
 */
export async function runProcessChain(tasks: Array<() => Promise<boolean>>): Promise<boolean> {
  for (const task of tasks) {
    const status = await task();
    if (!status) return false;
  }
  return true;
}