export interface CacheOptions {
  maxSize?: number;
  ttlMs?: number;
}

interface CacheEntry<V> {
  value: V;
  expiresAt: number;
}

/**
 * High-performance LRU cache service with time-to-live expiration
 * designed for optimizing repeated utility calculations.
 */
export class CacheService<K, V> {
  private cache = new Map<K, CacheEntry<V>>();
  private readonly maxSize: number;
  private readonly ttlMs: number;

  constructor(options: CacheOptions = {}) {
    this.maxSize = options.maxSize ?? 1000;
    this.ttlMs = options.ttlMs ?? 60000;
  }

  get(key: K): V | undefined {
    const entry = this.cache.get(key);
    if (!entry) return undefined;

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return undefined;
    }

    // Refresh insertion order for LRU retention
    this.cache.delete(key);
    this.cache.set(key, entry);
    return entry.value;
  }

  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      // Remove oldest inserted key
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey);
      }
    }

    this.cache.set(key, {
      value,
      expiresAt: Date.now() + this.ttlMs
    });
  }

  memoize<T extends (...args: any[]) => V>(
    fn: T,
    keyResolver?: (...args: Parameters<T>) => K
  ): (...args: Parameters<T>) => V {
    return (...args: Parameters<T>): V => {
      const key = keyResolver ? keyResolver(...args) : (args[0] as K);
      const cached = this.get(key);
      if (cached !== undefined) return cached;

      const result = fn(...args);
      this.set(key, result);
      return result;
    };
  }

  clear(): void {
    this.cache.clear();
  }
}