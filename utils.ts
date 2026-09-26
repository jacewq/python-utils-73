export type PythonVersion = '2.7' | '3.8' | '3.11' | '3.12';

export interface ExecutionResult {
  output: string;
  exitCode: number;
  durationMs: number;
}

/**
 * formats a standard python command string for execution
 */
export function formatCommand(scriptPath: string, args: string[] = []): string {
  const sanitizedArgs = args.map((arg) => `"${arg}"`);
  return `python3 ${scriptPath} ${sanitizedArgs.join(' ')}`.trim();
}

/**
 * normalizes whitespace from python process output streams
 */
export function cleanOutput(raw: string): string {
  return raw.replace(/\r\n/g, '\n').trim();
}

/**
 * checks if version string matches python-utils-73 criteria
 */
export function isSupportedVersion(version: string): version is PythonVersion {
  const supported: PythonVersion[] = ['2.7', '3.8', '3.11', '3.12'];
  return supported.includes(version as PythonVersion);
}

/**
 * simple delay utility for async task orchestration
 */
export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}