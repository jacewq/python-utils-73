// Function to transform data into a specified format
export function transformData<T>(data: T[], transformFn: (item: T) => any): any[] {
    return data.map(transformFn);
}

// Function to filter data based on a predicate function
export function filterData<T>(data: T[], predicateFn: (item: T) => boolean): T[] {
    return data.filter(predicateFn);
}

// Function to aggregate data based on a key and aggregation function
export function aggregateData<T>(
    data: T[],
    keyFn: (item: T) => string,
    aggregateFn: (acc: any, item: T) => any,
    initialValue: any
): Record<string, any> {
    return data.reduce((acc, item) => {
        const key = keyFn(item);
        acc[key] = aggregateFn(acc[key] || initialValue, item);
        return acc;
    }, {} as Record<string, any>);
}

// Example usage of the utility functions
const exampleData = [{ id: 1, value: 10 }, { id: 2, value: 20 }, { id: 1, value: 30 }];

const transformed = transformData(exampleData, item => ({ ...item, value: item.value * 2 }));
const filtered = filterData(exampleData, item => item.value > 15);
const aggregated = aggregateData(exampleData, item => item.id.toString(), (acc, item) => acc + item.value, 0);

console.log(transformed, filtered, aggregated);