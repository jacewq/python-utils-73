export function isNullOrUndefined(value: any): boolean {
    return value === null || value === undefined;
}

export function deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

export function isEmptyObject(obj: Record<string, unknown>): boolean {
    return Object.keys(obj).length === 0;
}

export function mergeObjects<T extends object>(target: T, source: Partial<T>): T {
    return { ...target, ...source };
}

export function generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}

export function hasProperty<T extends object>(obj: T, key: keyof T): boolean {
    return obj.hasOwnProperty(key);
}
