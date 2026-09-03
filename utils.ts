/**
 * Utility functions for python-utils-73
 */

export interface PythonData {
  id: string;
  payload: Record<string, unknown>;
  timestamp: number;
}

export const normalizePayload = (data: unknown): PythonData => {
  if (typeof data !== 'object' || data === null) {
    throw new Error('Invalid input: expected object');
  }

  return {
    id: crypto.randomUUID(),
    payload: data as Record<string, unknown>,
    timestamp: Date.now(),
  };
};

export const batchProcess = <T>(items: T[], chunkSize: number = 10): T[][] => {
  const batches: T[][] = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    batches.push(items.slice(i, i + chunkSize));
  }
  return batches;
};

export const formatPythonPath = (path: string): string => {
  return path.trim().replace(/\\/g, '/').replace(//+$/, '');
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};