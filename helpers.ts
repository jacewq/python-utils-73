type ErrorCode = 'NOT_FOUND' | 'INVALID_INPUT' | 'SERVER_ERROR';

class CustomError extends Error {
    code: ErrorCode;
    constructor(message: string, code: ErrorCode) {
        super(message);
        this.code = code;
    }
}

function handleError(error: unknown): string {
    if (error instanceof CustomError) {
        return `Error: ${error.message}, Code: ${error.code}`;
    }
    return 'An unexpected error occurred.';
}

function fetchData(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
        // Simulating a fetch call
        setTimeout(() => {
            const isError = Math.random() < 0.5;
            if (isError) {
                reject(new CustomError('Failed to fetch data', 'SERVER_ERROR'));
            } else {
                resolve('Data fetched successfully');
            }
        }, 1000);
    });
}

async function main() {
    try {
        const data = await fetchData('https://api.example.com/data');
        console.log(data);
    } catch (error) {
        const errorMessage = handleError(error);
        console.error(errorMessage);
    }
}

main();