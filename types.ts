/**
 * Interface representing a user in the system.
 */
export interface User {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
}

/**
 * A function that retrieves a user by their ID.
 * @param userId - The unique identifier of the user.
 * @returns A promise that resolves to a User object or null if not found.
 */
export async function getUserById(userId: number): Promise<User | null> {
    const users: User[] = [
        { id: 1, name: 'Alice', email: 'alice@example.com', isActive: true },
        { id: 2, name: 'Bob', email: 'bob@example.com', isActive: false },
    ];
    return users.find(user => user.id === userId) || null;
}

/**
 * Function to get all active users.
 * @returns A promise that resolves to an array of active User objects.
 */
export async function getActiveUsers(): Promise<User[]> {
    const users: User[] = [
        { id: 1, name: 'Alice', email: 'alice@example.com', isActive: true },
        { id: 2, name: 'Bob', email: 'bob@example.com', isActive: false },
    ];
    return users.filter(user => user.isActive);
}