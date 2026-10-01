/**
 * Utility for safe execution of python-related operations
 */

export class PythonExecutionError extends Error {
  constructor(public readonly code: number, message: string) {
    super(message);
    this.name = 'PythonExecutionError';
  }
}

export const safeExecute = <T>(fn: () => T, errorMessage: string): T => {
  try {
    return fn();
  } catch (err) {
    const details = err instanceof Error ? err.message : String(err);
    throw new PythonExecutionError(500, `${errorMessage}: ${details}`);
  }
};

export const validatePythonVersion = (version: string): void => {
  if (!version || typeof version !== 'string') {
    throw new Error('Invalid python version string provided');
  }
  const semverRegex = /^\d+\.\d+(\.\d+)?$/;
  if (!semverRegex.test(version)) {
    throw new TypeError(`Version ${version} does not match semver format`);
  }
};

export const parseSafePath = (path: string | undefined | null): string => {
  if (path === undefined || path === null || path.trim() === '') {
    return '/usr/bin/python3';
  }
  return path.trim();
};