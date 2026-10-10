export interface ServiceOptions {
  maxCacheSize?: number;
  ttlMs?: number;
}

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

export class BatchTransformService {
  private cache = new Map<string, CacheEntry<unknown>>();
  private maxCacheSize: number;
  private ttlMs: number;

  constructor(options: ServiceOptions = {}) {
    this.maxCacheSize = options.maxCacheSize ?? 1000;
    this.ttlMs = options.ttlMs ?? 60000;
  }

  public memoize<T extends (...args: any[]) => any>(fn: T): T {
    return ((...args: Parameters<T>): ReturnType<T> => {
      const key = JSON.stringify(args);
      const now = Date.now();
      const cached = this.cache.get(key);

      if (cached && cached.expiresAt > now) {
        return cached.value as ReturnType<T>;
      }

      // Evict oldest entry if capacity reached to avoid memory leaks
      if (this.cache.size >= this.maxCacheSize) {
        const oldestKey = this.cache.keys().next().value;
        if (oldestKey !== undefined) {
          this.cache.delete(oldestKey);
        }
      }

      const result = fn(...args);
      this.cache.set(key, { value: result, expiresAt: now + this.ttlMs });
      return result;
    }) as T;
  }

  public batchProcess<T, R>(items: T[], transformFn: (item: T) => R): R[] {
    const memoizedTransform = this.memoize(transformFn);
    const results: R[] = new Array(items.length);
    for (let i = 0; i < items.length; i++) {
      results[i] = memoizedTransform(items[i]);
    }
    return results;
  }

  public clearCache(): void {
    this.cache.clear();
  }
}