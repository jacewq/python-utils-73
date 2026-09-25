export interface ProcessTaskInput {
  id: string;
  command: string;
  args?: Record<string, unknown>;
  timeoutMs?: number;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export interface ProcessSummary {
  processedCount: number;
  failedCount: number;
  errors: Array<{ id: string; errors: string[] }>;
}

/**
 * Validates a single task input object before execution.
 */
export function validateTaskInput(input: unknown): ValidationResult {
  const errors: string[] = [];
  if (!input || typeof input !== 'object') {
    return { valid: false, errors: ['Input must be a non-null object'] };
  }

  const record = input as Record<string, unknown>;

  if (typeof record.id !== 'string' || record.id.trim() === '') {
    errors.push('Task id must be a non-empty string');
  }

  if (typeof record.command !== 'string' || record.command.trim() === '') {
    errors.push('Task command must be a non-empty string');
  }

  if (record.timeoutMs !== undefined) {
    if (typeof record.timeoutMs !== 'number' || record.timeoutMs <= 0) {
      errors.push('Task timeoutMs must be a positive number');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Main batch processing loop with input validation safeguards.
 */
export function processTaskBatch(tasks: unknown[]): ProcessSummary {
  const summary: ProcessSummary = {
    processedCount: 0,
    failedCount: 0,
    errors: [],
  };

  for (const item of tasks) {
    const validation = validateTaskInput(item);

    if (!validation.valid) {
      summary.failedCount++;
      const taskId = item && typeof item === 'object' && 'id' in item && typeof (item as Record<string, unknown>).id === 'string'
        ? (item as Record<string, unknown>).id as string
        : 'unknown';
      summary.errors.push({ id: taskId, errors: validation.errors });
      continue;
    }

    // Valid task ready for dispatch/execution
    summary.processedCount++;
  }

  return summary;
}