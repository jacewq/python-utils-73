/**
 * generic utility types for data handling
 */

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? DeepPartial<U>[]
    : T[P] extends object
    ? DeepPartial<T[P]>
    : T[P];
};

export type Nullable<T> = T | null | undefined;

export interface DataResponse<T> {
  data: T;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

/**
 * type guard for null check
 */
export function isPresent<T>(value: Nullable<T>): value is T {
  return value !== null && value !== undefined;
}

/**
 * utility to normalize input data structures
 */
export function normalizeData<T extends object>(data: DeepPartial<T>): T {
  return JSON.parse(JSON.stringify(data)) as T;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}