/**
 * Utility to transform and sanitize data inputs
 */

export interface DataRecord {
  id: string;
  value: unknown;
  timestamp: number;
}

/**
 * Safely parses input data into a clean object structure
 */
export function sanitizeData(input: unknown): DataRecord {
  const now = Date.now();

  if (typeof input === 'object' && input !== null && 'id' in input) {
    const record = input as Record<string, unknown>;
    return {
      id: String(record.id),
      value: record.value ?? null,
      timestamp: typeof record.timestamp === 'number' ? record.timestamp : now,
    };
  }

  return {
    id: 'unknown',
    value: input,
    timestamp: now,
  };
}

/**
 * Batch processor for collections of data
 */
export function processBatch(data: unknown[]): DataRecord[] {
  return data.map(sanitizeData);
}

/**
 * Filter records by value presence
 */
export function filterValidRecords(records: DataRecord[]): DataRecord[] {
  return records.filter((r) => r.value !== null && r.value !== undefined);
}