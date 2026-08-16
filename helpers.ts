export function isArray(item: any): item is any[] {
    return Array.isArray(item);
}

export function isString(item: any): item is string {
    return typeof item === 'string';
}

export function isNumber(item: any): item is number {
    return typeof item === 'number';
}

export function deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

export function mergeObjects<T extends object, U extends object>(
    target: T,
    source: U
): T & U {
    return Object.assign({}, target, source);
}

export function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function debounce(func: Function, delay: number) {
    let timeoutId: NodeJS.Timeout;
    return function(...args: any[]) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}