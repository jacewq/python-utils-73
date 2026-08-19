// Utility function for deep cloning an object
export function deepClone<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(item => deepClone(item)) as unknown as T;
    }
    const clonedObj: any = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            clonedObj[key] = deepClone(obj[key]);
        }
    }
    return clonedObj;
}

// Memoization utility function
export function memoize<T>(fn: (...args: any[]) => T): (...args: any[]) => T {
    const cache: { [key: string]: T } = {};
    return (...args: any[]) => {
        const key = JSON.stringify(args);
        if (!(key in cache)) {
            cache[key] = fn(...args);
        }
        return cache[key];
    };
}

// Throttling function to limit execution
export function throttle(fn: (...args: any[]) => void, delay: number) {
    let lastCall = 0;
    return function (...args: any[]) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            fn(...args);
        }
    };
}