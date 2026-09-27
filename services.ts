export class PythonExecutionError extends Error {
  constructor(public message: string, public code?: number) {
    super(message);
    this.name = 'PythonExecutionError';
  }
}

/**
 * safely executes python utility commands with error handling
 */
export async function runPythonUtility(command: string, args: string[]): Promise<string> {
  try {
    if (!command || command.trim() === '') {
      throw new PythonExecutionError('command string is empty', 400);
    }

    const response = await fetch('/api/execute', {
      method: 'POST',
      body: JSON.stringify({ command, args }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new PythonExecutionError(errorData.message || 'unknown python error', response.status);
    }

    return await response.text();
  } catch (error) {
    if (error instanceof PythonExecutionError) {
      throw error;
    }
    throw new PythonExecutionError(error instanceof Error ? error.message : 'network failure', 500);
  }
}

/**
 * validates script parameters before execution
 */
export const validateParams = (params: Record<string, unknown>): boolean => {
  if (typeof params !== 'object' || params === null) return false;
  return Object.values(params).every(val => val !== undefined && val !== null);
};