/**
 * LRU Cache Service for optimizing repetitive utility computations
 * in high-throughput workflows.
 */
export class LRUCacheService<K, V> {
  private cache: Map<K, V>;
  private readonly capacity: number;

  constructor(capacity: number = 256) {
    if (capacity <= 0) {
      throw new Error('Capacity must be a positive integer');
    }
    this.capacity = capacity;
    this.cache = new Map<K, V>();
  }

  public get(key: K): V | undefined {
    if (!this.cache.has(key)) {
      return undefined;
    }
    const value = this.cache.get(key)!;
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  public set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey);
      }
    }
    this.cache.set(key, value);
  }

  public getOrCompute(key: K, computeFn: (k: K) => V): V {
    const cached = this.get(key);
    if (cached !== undefined) {
      return cached;
    }
    const computed = computeFn(key);
    this.set(key, computed);
    return computed;
  }

  public clear(): void {
    this.cache.clear();
  }

  public get size(): number {
    return this.cache.size;
  }
}

export const globalMemoCache = new LRUCacheService<string, unknown>(512);
