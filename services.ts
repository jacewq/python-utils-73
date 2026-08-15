type ServiceResponse<T> = { data?: T; error?: string; };

async function fetchData<T>(url: string): Promise<ServiceResponse<T>> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: T = await response.json();
        return { data };
    } catch (error) {
        return { error: error instanceof Error ? error.message : 'Unknown error' };
    }
}

async function processUserData(userId: string): Promise<ServiceResponse<User>> {
    const url = `https://api.example.com/users/${userId}`;
    return await fetchData<User>(url);
}

async function handleUserRequest(userId: string): Promise<void> {
    const result = await processUserData(userId);
    if (result.error) {
        console.error('Error fetching user data:', result.error);
        return;
    }
    console.log('User data:', result.data);
}

handleUserRequest('1234');