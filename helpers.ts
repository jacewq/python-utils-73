export function memoize<T extends (...args: any[]) => any>(fn: T): T {
    const cache: { [key: string]: ReturnType<T> } = {};
    return function (...args: Parameters<T>): ReturnType<T> {
        const key = JSON.stringify(args);
        if (cache[key]) {
            return cache[key];
        }
        const result = fn(...args);
        cache[key] = result;
        return result;
    } as T;
}

export function debounce<T extends (...args: any[]) => void>(func: T, wait: number): T {
    let timeout: NodeJS.Timeout;
    return function (...args: Parameters<T>): void {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    } as T;
}

export function throttle<T extends (...args: any[]) => void>(func: T, limit: number): T {
    let lastFunc: NodeJS.Timeout;
    let lastRan: number;
    return function (...args: Parameters<T>): void {
        const context = this;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        }
        clearTimeout(lastFunc);
        lastFunc = setTimeout(() => {
            if ((Date.now() - lastRan) >= limit) {
                func.apply(context, args);
                lastRan = Date.now();
            }
        }, limit - (Date.now() - lastRan));
    } as T;
}
