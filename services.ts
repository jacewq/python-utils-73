import { performance } from 'perf_hooks';

/**
 * Optimized processor for batch data operations
 * Uses memoization to prevent redundant calculations
 */
export class DataProcessor {
  private cache: Map<string, any> = new Map();

  public processBatch(items: string[]): any[] {
    const startTime = performance.now();
    const results = items.map((item) => {
      if (this.cache.has(item)) {
        return this.cache.get(item);
      }

      const processed = this.heavyComputation(item);
      this.cache.set(item, processed);
      return processed;
    });

    console.log(`Batch processed in ${(performance.now() - startTime).toFixed(2)}ms`);
    return results;
  }

  private heavyComputation(input: string): string {
    // Simulate CPU intensive task
    let result = '';
    for (let i = 0; i < 1000; i++) {
      result += input.split('').reverse().join('');
    }
    return result;
  }

  public clearCache(): void {
    this.cache.clear();
  }
}