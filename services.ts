interface CacheEntry<T> {
  value: T;
  expiry: number;
}

/**
 * Optimized data provider with time-based memoization
 */
export class DataService {
  private cache = new Map<string, CacheEntry<any>>();
  private readonly TTL_MS = 60000;

  public async getCachedData<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    const now = Date.now();
    const cached = this.cache.get(key);

    if (cached && cached.expiry > now) {
      return cached.value;
    }

    try {
      const value = await fetcher();
      this.cache.set(key, {
        value,
        expiry: now + this.TTL_MS,
      });
      return value;
    } catch (error) {
      console.error(`Failed to fetch data for key: ${key}`, error);
      throw error;
    }
  }

  public clearExpired(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (entry.expiry <= now) {
        this.cache.delete(key);
      }
    }
  }
}