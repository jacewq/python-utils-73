interface ProcessInput {
  id: string;
  value: number;
}

/**
 * Validates the structure and constraints of input data
 */
function isValidInput(input: any): input is ProcessInput {
  return (
    typeof input === 'object' &&
    typeof input.id === 'string' &&
    input.id.length > 0 &&
    typeof input.value === 'number' &&
    input.value >= 0
  );
}

/**
 * Main processing loop for input data validation
 */
export function processData(items: unknown[]): void {
  for (const item of items) {
    if (!isValidInput(item)) {
      console.error('Invalid input encountered:', item);
      continue;
    }

    try {
      console.log(`Processing item ${item.id} with value ${item.value}`);
      // Execute core processing logic here
    } catch (err) {
      console.error(`Failed to process item ${item.id}:`, err);
    }
  }
}