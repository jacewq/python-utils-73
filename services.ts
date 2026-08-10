import axios, { AxiosError } from 'axios';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // in milliseconds

async function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithRetry(url: string, options: any, retries: number = MAX_RETRIES): Promise<any> {
    try {
        const response = await axios(url, options);
        return response.data;
    } catch (error) {
        if (retries > 0 && (error as AxiosError).response?.status >= 500) {
            console.warn(`Retrying... Remaining attempts: ${retries}`);
            await delay(RETRY_DELAY);
            return fetchWithRetry(url, options, retries - 1);
        }
        throw error;
    }
}

export { fetchWithRetry };