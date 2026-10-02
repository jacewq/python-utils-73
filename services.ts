import { z } from 'zod';

interface ProcessInput {
  id: string;
  payload: Record<string, any>;
  timestamp: number;
}

const InputSchema = z.object({
  id: z.string().uuid(),
  payload: z.record(z.any()),
  timestamp: z.number().positive(),
});

/**
 * Processes a batch of inputs with strict schema validation
 */
export function processBatch(inputs: unknown[]): void {
  for (const rawInput of inputs) {
    const validation = InputSchema.safeParse(rawInput);

    if (!validation.success) {
      console.error('Invalid input encountered, skipping:', validation.error.format());
      continue;
    }

    const data: ProcessInput = validation.data;
    executeTask(data);
  }
}

function executeTask(item: ProcessInput): void {
  console.log(`Processing item ${item.id} at ${item.timestamp}`);
}