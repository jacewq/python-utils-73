export interface ProcessedInput {
  id: string;
  value: number;
  timestamp: number;
}

export const validateInput = (data: unknown): data is ProcessedInput => {
  if (typeof data !== 'object' || data === null) return false;
  const d = data as Record<string, unknown>;

  const isIdValid = typeof d.id === 'string' && d.id.length > 0;
  const isValueValid = typeof d.value === 'number' && Number.isFinite(d.value);
  const isTimestampValid = typeof d.timestamp === 'number';

  return isIdValid && isValueValid && isTimestampValid;
};

export const processMainLoop = (items: unknown[]): ProcessedInput[] => {
  const results: ProcessedInput[] = [];

  for (const item of items) {
    if (validateInput(item)) {
      results.push(item);
    } else {
      console.warn('Invalid input format detected, skipping item:', item);
    }
  }

  return results;
};

export type ProcessingError = {
  code: string;
  message: string;
};

export const createError = (code: string, message: string): ProcessingError => ({
  code,
  message
});