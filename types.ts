/**
 * generic utility types for python-utils-73 data handling
 */

export type Nullable<T> = T | null | undefined;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? DeepPartial<U>[]
    : T[P] extends object
    ? DeepPartial<T[P]>
    : T[P];
};

export interface DataEnvelope<T> {
  payload: T;
  timestamp: number;
  metadata: Record<string, unknown>;
}

export const isDefined = <T>(value: Nullable<T>): value is T => {
  return value !== null && value !== undefined;
};

export const wrapData = <T>(data: T, extra: Record<string, unknown> = {}): DataEnvelope<T> => ({
  payload: data,
  timestamp: Date.now(),
  metadata: extra,
});

export const extractValue = <T, K extends keyof T>(obj: T, key: K): T[K] => {
  return obj[key];
};