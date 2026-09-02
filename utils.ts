export interface CacheEntry<T> {
  value: T;
  timestamp: number;
  accessCount: number;
}

export class PerformanceCache<T> {
  private store: Map<string, CacheEntry<T>> = new Map();
  private maxSize: number;
  private ttl: number;

  constructor(maxSize: number = 1000, ttl: number = 300000) {
    this.maxSize = maxSize;
    this.ttl = ttl;
  }

  private isExpired(entry: CacheEntry<T>): boolean {
    return Date.now() - entry.timestamp > this.ttl;
  }

  get(key: string): T | undefined {
    const entry = this.store.get(key);
    if (!entry) return undefined;
    if (this.isExpired(entry)) {
      this.store.delete(key);
      return undefined;
    }
    entry.accessCount++;
    return entry.value;
  }

  set(key: string, value: T): void {
    if (this.store.size >= this.maxSize) {
      this.evictLeastUsed();
    }
    this.store.set(key, { value, timestamp: Date.now(), accessCount: 1 });
  }

  private evictLeastUsed(): void {
    let leastKey: string | null = null;
    let leastCount = Infinity;
    for (const [key, entry] of this.store) {
      if (entry.accessCount < leastCount) {
        leastCount = entry.accessCount;
        leastKey = key;
      }
    }
    if (leastKey) this.store.delete(leastKey);
  }
}

export function createMemoizedFunction<T extends (...args: any[]) => any>(
  fn: T, cache: PerformanceCache<ReturnType<T>> = new PerformanceCache()
): T {
  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    const cached = cache.get(key);
    if (cached !== undefined) return cached;
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

export function computeHeavyTask(data: number[]): number {
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += Math.pow(data[i], 2);
  }
  return sum;
}

export const memoizedHeavyTask = createMemoizedFunction(computeHeavyTask);

export function processArrayEfficiently<T>(array: T[], transform: (item: T) => any): any[] {
  return array.map(transform);
}

export const memoizedProcess = createMemoizedFunction(processArrayEfficiently);