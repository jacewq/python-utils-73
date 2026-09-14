export interface ProcessingItem {
  id: string;
  command: string;
  args?: Record<string, unknown>;
  timeoutMs?: number;
}

export interface ProcessingResult {
  id: string;
  success: boolean;
  error?: string;
  data?: string;
}

export class BatchProcessor {
  private validateItem(item: unknown): item is ProcessingItem {
    if (!item || typeof item !== 'object') {
      return false;
    }
    const record = item as Record<string, unknown>;
    if (typeof record.id !== 'string' || record.id.trim() === '') {
      return false;
    }
    if (typeof record.command !== 'string' || record.command.trim() === '') {
      return false;
    }
    if (record.timeoutMs !== undefined && (typeof record.timeoutMs !== 'number' || record.timeoutMs <= 0)) {
      return false;
    }
    return true;
  }

  public processBatch(rawItems: unknown[]): ProcessingResult[] {
    const results: ProcessingResult[] = [];

    for (let i = 0; i < rawItems.length; i++) {
      const rawItem = rawItems[i];

      // Validate input payload before processing
      if (!this.validateItem(rawItem)) {
        const fallbackId = (rawItem && typeof rawItem === 'object' && 'id' in rawItem && typeof rawItem.id === 'string')
          ? rawItem.id
          : `invalid-${i}`;

        results.push({
          id: fallbackId,
          success: false,
          error: 'Invalid input payload structure or missing required fields',
        });
        continue;
      }

      try {
        const formattedCmd = `${rawItem.command.toLowerCase().trim()}:${JSON.stringify(rawItem.args || {})}`;
        results.push({
          id: rawItem.id,
          success: true,
          data: formattedCmd,
        });
      } catch (err) {
        results.push({
          id: rawItem.id,
          success: false,
          error: err instanceof Error ? err.message : 'Processing error',
        });
      }
    }

    return results;
  }
}