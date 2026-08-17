// TypeScript helper functions with error handling

// A utility function to parse JSON safely
export function safeJsonParse<T>(jsonString: string): T | null {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.error('Invalid JSON string:', error);
        return null;
    }
}

// A function that divides two numbers with error handling
type DivisionResult = { result: number; error: string | null };

export function safeDivide(dividend: number, divisor: number): DivisionResult {
    if (divisor === 0) {
        return { result: 0, error: 'Division by zero is not allowed' };
    }
    return { result: dividend / divisor, error: null };
}

// Function to read a file and return its content with error handling
export async function readFileSafe(filePath: string): Promise<string | null> {
    const fs = require('fs').promises;
    try {
        return await fs.readFile(filePath, 'utf8');
    } catch (error) {
        console.error('Error reading file:', error);
        return null;
    }
}

// A utility function to validate parameters
export function validateParams(params: object): boolean {
    if (typeof params !== 'object' || params === null) {
        console.error('Invalid parameters: must be a non-null object');
        return false;
    }
    return true;
}
