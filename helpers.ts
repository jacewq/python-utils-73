export interface ProcessedData {
  id: string;
  value: number;
}

export const validateInput = (input: unknown): input is ProcessedData => {
  if (typeof input !== 'object' || input === null) return false;
  const data = input as Record<string, unknown>;
  return (
    typeof data.id === 'string' &&
    typeof data.value === 'number' &&
    !Number.isNaN(data.value)
  );
};

export const processInputBatch = (items: unknown[]): ProcessedData[] => {
  const validItems: ProcessedData[] = [];

  for (const item of items) {
    // validate schema before processing
    if (validateInput(item)) {
      validItems.push(item);
    } else {
      console.warn('Skipping invalid record in processing loop:', item);
    }
  }

  return validItems;
};