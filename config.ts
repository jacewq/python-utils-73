export interface Config {
    apiUrl: string;
    port: number;
    env: 'development' | 'production' | 'testing';
}

const config: Config = {
    apiUrl: process.env.API_URL || 'http://localhost:3000',
    port: Number(process.env.PORT) || 3000,
    env: (process.env.NODE_ENV as 'development' | 'production' | 'testing') || 'development',
};

export default config;
