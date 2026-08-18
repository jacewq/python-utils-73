type User = { id: number; name: string; email: string; };

function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
}

function isEmailValid(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function getUserDisplayName(user: User): string {
    return `${user.name} <${user.email}>`;
}

export { formatDate, isEmailValid, getUserDisplayName, User };