export interface CacheOptions {
  ttlMs?: number;
  maxSize?: number;
}

interface CacheEntry<T> {
  value: T;
  timestamp: number;
}

export class MemoizedService<TArgs extends any[], TResult> {
  private cache = new Map<string, CacheEntry<TResult>>();
  private readonly ttlMs: number;
  private readonly maxSize: number;

  constructor(
    private readonly fn: (...args: TArgs) => TResult,
    options: CacheOptions = {}
  ) {
    this.ttlMs = options.ttlMs ?? 60000;
    this.maxSize = options.maxSize ?? 1000;
  }

  private generateKey(args: TArgs): string {
    return JSON.stringify(args);
  }

  public execute(...args: TArgs): TResult {
    const key = this.generateKey(args);
    const now = Date.now();
    const cached = this.cache.get(key);

    if (cached && now - cached.timestamp < this.ttlMs) {
      return cached.value;
    }

    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey);
      }
    }

    const result = this.fn(...args);
    this.cache.set(key, { value: result, timestamp: now });
    return result;
  }

  public clearCache(): void {
    this.cache.clear();
  }

  public get size(): number {
    return this.cache.size;
  }
}