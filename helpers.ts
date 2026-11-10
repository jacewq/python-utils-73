export interface ProcessItem {
  id: string;
  payload: Record<string, unknown>;
  retries?: number;
}

export interface ValidationRule {
  field: string;
  required?: boolean;
  type?: 'string' | 'number' | 'boolean' | 'object';
}

export interface ProcessResult {
  processed: ProcessItem[];
  invalid: { item: ProcessItem; reason: string }[];
}

/**
 * Validates a single item payload against defined rules.
 */
function validateItem(item: ProcessItem, rules: ValidationRule[]): string | null {
  if (!item || typeof item !== 'object') {
    return 'Item must be a valid object';
  }
  if (!item.id || typeof item.id !== 'string') {
    return 'Item missing valid string id';
  }
  if (!item.payload || typeof item.payload !== 'object') {
    return 'Item payload must be an object';
  }

  for (const rule of rules) {
    const value = item.payload[rule.field];
    if (rule.required && (value === undefined || value === null)) {
      return `Missing required field: ${rule.field}`;
    }
    if (value !== undefined && value !== null && rule.type && typeof value !== rule.type) {
      return `Field ${rule.field} must be of type ${rule.type}`;
    }
  }
  return null;
}

/**
 * Main processing loop with input validation for incoming batch items.
 */
export function processBatchInputs(
  items: ProcessItem[],
  rules: ValidationRule[] = []
): ProcessResult {
  const processed: ProcessItem[] = [];
  const invalid: { item: ProcessItem; reason: string }[] = [];

  for (const item of items) {
    const validationError = validateItem(item, rules);
    if (validationError) {
      invalid.push({ item, reason: validationError });
      continue;
    }

    const sanitizedPayload = { ...item.payload, _validatedAt: Date.now() };
    processed.push({
      ...item,
      payload: sanitizedPayload,
    });
  }

  return { processed, invalid };
}