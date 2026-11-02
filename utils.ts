export interface ProcessTask {
  id: string;
  command: string;
  args?: Record<string, unknown>;
  timeoutMs?: number;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Validates an individual task payload before processing.
 */
export function validateTask(task: unknown): ValidationResult {
  const errors: string[] = [];

  if (!task || typeof task !== 'object') {
    return { valid: false, errors: ['Task must be a non-null object'] };
  }

  const candidate = task as Record<string, unknown>;

  if (typeof candidate.id !== 'string' || candidate.id.trim() === '') {
    errors.push('Task id must be a non-empty string');
  }

  if (typeof candidate.command !== 'string' || candidate.command.trim() === '') {
    errors.push('Task command must be a non-empty string');
  }

  if (candidate.timeoutMs !== undefined) {
    if (typeof candidate.timeoutMs !== 'number' || candidate.timeoutMs <= 0) {
      errors.push('Task timeoutMs must be a positive number');
    }
  }

  if (candidate.args !== undefined && (typeof candidate.args !== 'object' || candidate.args === null)) {
    errors.push('Task args must be a key-value object');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Processes a batch of tasks, skipping invalid inputs with validation errors.
 */
export function processTaskBatch(tasks: unknown[]): {
  processed: string[];
  skipped: { task: unknown; errors: string[] }[];
} {
  const processed: string[] = [];
  const skipped: { task: unknown; errors: string[] }[] = [];

  for (const item of tasks) {
    // Input validation step in the main loop
    const validation = validateTask(item);

    if (!validation.valid) {
      skipped.push({ task: item, errors: validation.errors });
      continue;
    }

    const validTask = item as ProcessTask;
    processed.push(validTask.id);
  }

  return { processed, skipped };
}