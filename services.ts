type User = { id: number; name: string; email: string; };

type ApiResponse<T> = { status: number; data: T; message?: string; };

/**
 * Fetch user by ID from the API.
 * @param userId - The ID of the user to fetch.
 * @returns Promise resolving to an ApiResponse with User data.
 */
async function fetchUser(userId: number): Promise<ApiResponse<User>> {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    const data = await response.json();
    return { status: response.status, data: data };  
}

/**
 * Update user information on the API.
 * @param user - The user object containing updated information.
 * @returns Promise resolving to an ApiResponse of the updated User.
 */
async function updateUser(user: User): Promise<ApiResponse<User>> {
    const response = await fetch(`https://api.example.com/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });
    const data = await response.json();
    return { status: response.status, data: data };
}