function isObject(value: any): value is Record<string, any> {
    return value !== null && typeof value === 'object';
}

function mergeObjects<T extends Record<string, any>>(target: T, source: Partial<T>): T {
    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            if (isObject(source[key]) && isObject(target[key])) {
                target[key] = mergeObjects(target[key], source[key]); // Recursive merge
            } else {
                target[key] = source[key]; // Direct assignment
            }
        }
    }
    return target;
}

function deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

function flattenObject(obj: Record<string, any>, parentKey: string = '', result: Record<string, any> = {}): Record<string, any> {
    for (const key in obj) {
        const newKey = parentKey ? `${parentKey}.${key}` : key;
        if (isObject(obj[key])) {
            flattenObject(obj[key], newKey, result);
        } else {
            result[newKey] = obj[key];
        }
    }
    return result;
}

export { mergeObjects, deepClone, flattenObject };