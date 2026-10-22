/**
 * Efficient caching utility for high-frequency operations.
 * Implements an LRU-like pattern for memory-sensitive environments.
 */

export interface CacheOptions {
  maxSize: number;
  ttlMs: number;
}

export class Memoizer<K, V> {
  private cache: Map<K, { value: V; expiry: number }> = new Map();

  constructor(private readonly options: CacheOptions) {}

  /**
   * Retrieves value from cache or executes provider function.
   */
  public get(key: K, provider: () => V): V {
    const entry = this.cache.get(key);
    const now = Date.now();

    if (entry && entry.expiry > now) {
      return entry.value;
    }

    const value = provider();
    this.set(key, value);
    return value;
  }

  private set(key: K, value: V): void {
    if (this.cache.size >= this.options.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(key, {
      value,
      expiry: Date.now() + this.options.ttlMs,
    });
  }

  public clear(): void {
    this.cache.clear();
  }
}