export interface ProcessingTask {
  id: string;
  scriptName: string;
  timeoutMs: number;
  params?: Record<string, unknown>;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export interface ProcessedItemResult {
  id: string;
  success: boolean;
  errors?: string[];
  output?: string;
}

export function validateTaskInput(task: unknown): ValidationResult {
  const errors: string[] = [];

  if (!task || typeof task !== 'object') {
    return { valid: false, errors: ['Task input must be a non-null object'] };
  }

  const t = task as Record<string, unknown>;

  if (typeof t.id !== 'string' || t.id.trim() === '') {
    errors.push('Task ID must be a non-empty string');
  }

  if (typeof t.scriptName !== 'string' || !/^[a-zA-Z0-9_\-.]+\.py$/.test(t.scriptName)) {
    errors.push('Script name must be a valid .py filename');
  }

  if (typeof t.timeoutMs !== 'number' || t.timeoutMs <= 0 || t.timeoutMs > 300000) {
    errors.push('Timeout must be a positive number up to 300000ms');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function processTaskBatch(tasks: unknown[]): ProcessedItemResult[] {
  const results: ProcessedItemResult[] = [];

  for (const rawTask of tasks) {
    const validation = validateTaskInput(rawTask);

    if (!validation.valid) {
      const taskId = rawTask && typeof rawTask === 'object' && 'id' in rawTask && typeof (rawTask as Record<string, unknown>).id === 'string'
        ? (rawTask as Record<string, unknown>).id as string
        : 'unknown';

      results.push({
        id: taskId,
        success: false,
        errors: validation.errors,
      });
      continue;
    }

    const task = rawTask as ProcessingTask;
    results.push({
      id: task.id,
      success: true,
      output: `Executed ${task.scriptName} successfully`,
    });
  }

  return results;
}