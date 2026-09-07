/**
 * Safe integer validator to prevent floating point issues in array indexing.
 */
function safeInt(val: number): number {
  if (Number.isNaN(val) || !Number.isFinite(val)) {
    throw new TypeError("Value must be a finite number");
  }
  return Math.trunc(val);
}

/**
 * Replicates Python's slice behaviour for arrays with comprehensive validation.
 * Prevents infinite loops from zero-step values and safely handles negative boundaries.
 * 
 * @param array The source array
 * @param start The slice starting boundary
 * @param end The slice ending boundary (exclusive)
 * @param step The iteration step interval (non-zero)
 */
export function safeSlice<T>(
  array: T[],
  start?: number,
  end?: number,
  step: number = 1
): T[] {
  if (!Array.isArray(array)) {
    throw new TypeError("Input target must be an array");
  }

  const stepVal = safeInt(step);
  if (stepVal === 0) {
    throw new RangeError("slice step cannot be zero");
  }

  const len = array.length;
  if (len === 0) {
    return [];
  }

  // Handle empty or negative boundaries safely based on step direction
  let startIdx = start !== undefined ? safeInt(start) : (stepVal > 0 ? 0 : len - 1);
  let endIdx = end !== undefined ? safeInt(end) : (stepVal > 0 ? len : -1 - len);

  // Convert negative index markers to dynamic length boundaries
  if (startIdx < 0) {
    startIdx = Math.max(0, len + startIdx);
  } else {
    startIdx = Math.min(len, startIdx);
  }

  if (endIdx < 0) {
    endIdx = Math.max(-1, len + endIdx);
  } else {
    endIdx = Math.min(len, endIdx);
  }

  const result: T[] = [];

  if (stepVal > 0) {
    for (let i = startIdx; i < endIdx; i += stepVal) {
      if (i >= 0 && i < len) {
        result.push(array[i]);
      }
    }
  } else {
    for (let i = startIdx; i > endIdx; i += stepVal) {
      if (i >= 0 && i < len) {
        result.push(array[i]);
      }
    }
  }

  return result;
}