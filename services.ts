export interface ScriptTask {
  id: string;
  scriptName: string;
  maxRetries: number;
  payload?: Record<string, unknown>;
}

export interface TaskStatus {
  taskId: string;
  isValid: boolean;
  reason?: string;
}

export class TaskExecutionService {
  /**
   * Validates script execution parameters before processing.
   */
  private validateTask(task: unknown): { valid: boolean; reason?: string } {
    if (typeof task !== 'object' || task === null) {
      return { valid: false, reason: 'Task item must be a non-null object' };
    }

    const candidate = task as Partial<ScriptTask>;

    if (!candidate.id || typeof candidate.id !== 'string') {
      return { valid: false, reason: 'Missing or invalid task ID' };
    }

    if (!candidate.scriptName || typeof candidate.scriptName !== 'string') {
      return { valid: false, reason: 'Invalid or missing scriptName' };
    }

    if (
      typeof candidate.maxRetries !== 'number' ||
      candidate.maxRetries < 0 ||
      candidate.maxRetries > 10
    ) {
      return { valid: false, reason: 'maxRetries must be between 0 and 10' };
    }

    return { valid: true };
  }

  /**
   * Main processing loop executing validated tasks.
   */
  public processBatch(tasks: unknown[]): TaskStatus[] {
    const results: TaskStatus[] = [];

    for (const rawTask of tasks) {
      const validation = this.validateTask(rawTask);
      const taskId = (rawTask as Partial<ScriptTask>)?.id ?? 'unknown';

      if (!validation.valid) {
        results.push({
          taskId,
          isValid: false,
          reason: validation.reason,
        });
        continue;
      }

      results.push({
        taskId,
        isValid: true,
      });
    }

    return results;
  }
}