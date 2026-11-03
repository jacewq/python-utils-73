/**
 * General utility type definitions for python-utils-73.
 */

/** Options for array slicing resembling Python slice() parameters. */
export interface SliceOptions {
  /** Starting index for slice operation. */
  start?: number;
  /** Ending index for slice operation. */
  stop?: number;
  /** Step value for index increments. */
  step?: number;
}

/** Options for configuring default dict containers. */
export interface DefaultDictConfig<V> {
  /** Factory function to produce default value for missing keys. */
  factory: () => V;
  /** Initial object entries to seed the dictionary. */
  initialData?: Record<string, V>;
}

/** Container type representing Python-like (success, value/error) result tuples. */
export type Result<T, E extends Error = Error> =
  | { ok: true; value: T; error?: never }
  | { ok: false; value?: never; error: E };

/** Options for range generation functions mimicking Python's range(). */
export interface RangeOptions {
  /** Starting integer of the range. */
  start: number;
  /** Inclusive or exclusive stop boundary. */
  stop: number;
  /** Increment or decrement step value. */
  step?: number;
}

/** Callback function signature for collection transformation. */
export type MapCallback<T, R> = (element: T, index: number) => R;
