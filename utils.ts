export async function retry<T>(fn: () => Promise<T>, retries: number = 3, delay: number = 1000): Promise<T> {
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        } catch (error) {
            if (i === retries - 1) {
                throw error; // rethrow last error
            }
            console.warn(`Attempt ${i + 1} failed. Retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

// Example usage:
/* 
async function fetchData() {
    // Simulated network operation
}

retry(fetchData, 5, 2000).then(data => {
    console.log('Data fetched:', data);
}).catch(error => {
    console.error('Failed to fetch data:', error);
}); 
*/