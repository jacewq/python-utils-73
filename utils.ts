type DataType<T> = { [key: string]: T }; 

/**  
 * Merges two objects of the same shape into one. 
 * Properties from the second object will overwrite the first.  
 * @param a - first object  
 * @param b - second object  
 * @returns a new object that is the merge of a and b  
 */  
function mergeObjects<T>(a: DataType<T>, b: DataType<T>): DataType<T> {  
    return { ...a, ...b };  
}  

/**  
 * Clones a deep copy of an object.  
 * @param obj - object to clone  
 * @returns a new object that is a deep copy of the original  
 */  
function deepClone<T>(obj: T): T {  
    return JSON.parse(JSON.stringify(obj));  
}  

/**  
 * Filters an array of objects by a specific key value.  
 * @param arr - array to filter  
 * @param key - key in the object to match  
 * @param value - value to match against  
 * @returns filtered array of objects  
 */  
function filterByKeyValue<T>(arr: T[], key: keyof T, value: any): T[] {  
    return arr.filter(item => item[key] === value);  
}  

export { mergeObjects, deepClone, filterByKeyValue };