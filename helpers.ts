export interface PythonProcessResult {
  output: string;
  exitCode: number;
  error?: string;
}

/**
 * Formats a list of arguments into a shell-safe string for python execution.
 */
export const formatArgs = (args: (string | number)[]): string => {
  return args.map((arg) => (typeof arg === 'string' ? `"${arg}"` : arg)).join(' ');
};

/**
 * Parses a raw console buffer into a typed ProcessResult object.
 */
export const parseOutput = (data: string, code: number | null): PythonProcessResult => {
  const result: PythonProcessResult = {
    output: data.trim(),
    exitCode: code ?? 0,
  };

  if (result.exitCode !== 0) {
    result.error = `Process exited with code ${result.exitCode}`;
  }

  return result;
};

/**
 * Validates that the provided python version string meets local requirements.
 */
export const validateVersion = (version: string): boolean => {
  const versionRegex = /^\d+\.\d+/;
  return versionRegex.test(version);
};