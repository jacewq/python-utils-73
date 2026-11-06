interface ProcessInput {
  id: string;
  value: number;
}

/**
 * Validates the input structure and range constraints
 */
function validateInput(input: any): input is ProcessInput {
  return (
    typeof input === 'object' &&
    typeof input.id === 'string' &&
    typeof input.value === 'number' &&
    input.value >= 0
  );
}

/**
 * Main processing loop with input sanitation
 */
export function processBatch(data: unknown[]): void {
  for (const item of data) {
    if (!validateInput(item)) {
      console.error('Invalid payload encountered, skipping:', item);
      continue;
    }

    try {
      console.log(`Processing item ${item.id}: ${item.value * 2}`);
    } catch (err) {
      console.error(`Execution failure for ${item.id}:`, err);
    }
  }
}