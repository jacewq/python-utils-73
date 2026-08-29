export interface Result<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export class Services {
  // Process data handling edge cases
  process(input: any): Result<any> {
    if (input == null) {  // covers null and undefined
      return { success: false, error: 'Input is null or undefined' };
    }
    if (typeof input !== 'object' || Array.isArray(input)) {
      return { success: false, error: 'Input must be a non-array object' };
    }
    try {
      const result: any = {};
      Object.keys(input).forEach(key => {
        const val = input[key];
        if (val == null) {
          result[key] = null;
        } else if (typeof val === 'number' && isNaN(val)) {
          throw new Error('NaN value found in input');
        } else if (Array.isArray(val)) {
          if (val.length === 0) {
            result[key] = [];
          } else {
            result[key] = val.filter((v: any) => v != null);
          }
        } else {
          result[key] = val;
        }
      });
      if (Object.keys(result).length === 0) {
        return { success: false, error: 'Processed object is empty' };
      }
      return { success: true, data: result };
    } catch (e) {
      return { success: false, error: e instanceof Error ? e.message : 'Processing error' };
    }
  }

  // Safe division
  divide(num: number, den: number): Result<number> {
    if (typeof num !== 'number' || typeof den !== 'number' || isNaN(num) || isNaN(den)) {
      return { success: false, error: 'Invalid numeric inputs' };
    }
    if (den === 0) {
      return { success: false, error: 'Cannot divide by zero' };
    }
    return { success: true, data: num / den };
  }

  // Average with checks
  average(values: number[]): Result<number> {
    if (!values || values.length === 0) {
      return { success: false, error: 'Empty or invalid array' };
    }
    try {
      const valid = values.filter(v => typeof v === 'number' && !isNaN(v));
      if (valid.length === 0) {
        throw new Error('No valid numbers');
      }
      const sum = valid.reduce((a, b) => a + b, 0);
      return { success: true, data: sum / valid.length };
    } catch (e) {
      return { success: false, error: e instanceof Error ? e.message : 'Average error' };
    }
  }
}