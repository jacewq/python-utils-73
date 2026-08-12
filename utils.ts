export function isNullOrUndefined(value: any): boolean {
    return value === null || value === undefined;
}

export function deepClone<T>(obj: T): T {
    return Array.isArray(obj) ? [...obj] : {...obj};
}

export function mergeObjects<T extends object>(target: T, source: Partial<T>): T {
    return Object.assign({}, target, source);
}

export function flattenArray<T>(arr: T[][]): T[] {
    return arr.reduce((flat, toFlatten) => flat.concat(toFlatten), []);
}

export function debounce(fn: Function, delay: number): Function {
    let timeoutId: NodeJS.Timeout;
    return function(...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
}

export function throttle(fn: Function, limit: number): Function {
    let lastFn: NodeJS.Timeout;
    let lastRan: number;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            fn.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFn);
            lastFn = setTimeout(function() {
                if (Date.now() - lastRan >= limit) {
                    fn.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}
