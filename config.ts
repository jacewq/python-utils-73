export interface CacheConfig {
  ttl: number;
  maxSize: number;
}

/**
 * Configuration manager with memoized accessors
 * to prevent redundant lookups in core loops
 */
class ConfigManager {
  private cache: Map<string, any> = new Map();
  private readonly config: CacheConfig = {
    ttl: 60000,
    maxSize: 1000,
  };

  public getConfiguration<T>(key: string, defaultValue: T): T {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    const value = (process.env[key] as unknown as T) ?? defaultValue;
    this.cache.set(key, value);
    return value;
  }

  public invalidate(): void {
    this.cache.clear();
  }

  public get ttl(): number {
    return this.config.ttl;
  }
}

export const configManager = new ConfigManager();