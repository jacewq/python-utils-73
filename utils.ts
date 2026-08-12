export function memoize<F extends (...args: any[]) => any>(fn: F): F {
    const cache = new Map<string, ReturnType<F>>();

    return function (...args: any[]): ReturnType<F> {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key)!;
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    } as F;
}

export function debounce<F extends (...args: any[]) => void>(func: F, wait: number): F {
    let timeout: NodeJS.Timeout;
    return function (...args: any[]): void {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    } as F;
}

export function throttle<F extends (...args: any[]) => void>(func: F, limit: number): F {
    let lastFunc: NodeJS.Timeout;
    let lastRan: number;
    return function (...args: any[]): void {
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
    } as F;
}
