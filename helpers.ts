// Helper function to check if a value is an array
export function isArray(value: any): value is Array<any> {
    return Array.isArray(value);
}

// Helper function to flatten an array
export function flattenArray<T>(arrays: T[][]): T[] {
    return arrays.reduce((flat: T[], toFlatten: T[]) => {
        return flat.concat(toFlatten);
    }, []);
}

// Helper function to capitalize the first letter of a string
export function capitalizeFirstLetter(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Helper function to debounce a function
export function debounce(func: (...args: any[]) => void, delay: number) {
    let timeout: NodeJS.Timeout | null;
    return (...args: any[]) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

// Helper function to format date
export function formatDate(date: Date, format: string): string {
    // Implement simple date formatting
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}