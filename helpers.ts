/**
 * Custom error types for Python-like validation handling.
 */
export class PythonValueError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PythonValueError';
  }
}

export class PythonTypeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PythonTypeError';
  }
}

export interface RangeConfig {
  start: number;
  stop: number;
  step: number;
}

/**
 * Parses and validates Python-style range parameters with explicit edge-case error checks.
 */
export function parseRangeArgs(start: number, stop?: number, step?: number): RangeConfig {
  if (typeof start !== 'number' || !Number.isFinite(start)) {
    throw new PythonTypeError(`Invalid start argument: ${start}. Must be a finite number.`);
  }

  let actualStart = start;
  let actualStop = stop;
  const actualStep = step ?? 1;

  if (stop === undefined) {
    actualStart = 0;
    actualStop = start;
  } else if (typeof stop !== 'number' || !Number.isFinite(stop)) {
    throw new PythonTypeError(`Invalid stop argument: ${stop}. Must be a finite number.`);
  }

  if (typeof actualStep !== 'number' || !Number.isFinite(actualStep)) {
    throw new PythonTypeError(`Invalid step argument: ${actualStep}. Must be a finite number.`);
  }

  if (actualStep === 0) {
    throw new PythonValueError('range() step argument must not be zero');
  }

  return {
    start: Math.trunc(actualStart),
    stop: Math.trunc(actualStop),
    step: Math.trunc(actualStep)
  };
}

/**
 * Generates an array of numbers replicating Python range behavior safely.
 */
export function pythonRange(start: number, stop?: number, step?: number): number[] {
  const config = parseRangeArgs(start, stop, step);
  const { start: rStart, stop: rStop, step: rStep } = config;

  const estimatedSize = Math.ceil(Math.abs((rStop - rStart) / rStep));
  if (estimatedSize > 1_000_000) {
    throw new RangeError(`Range size ${estimatedSize} exceeds maximum allocation threshold.`);
  }

  const result: number[] = [];
  for (let i = rStart; rStep > 0 ? i < rStop : i > rStop; i += rStep) {
    result.push(i);
  }

  return result;
}