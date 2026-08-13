import fs from 'fs';
import path from 'path';

interface Config {
    [key: string]: any;
}

const defaultConfig: Config = {
    host: 'localhost',
    port: 3000,
    useHttps: false,
};

const loadConfig = (configFilePath: string): Config => {
    try {
        const fullPath = path.resolve(configFilePath);
        const fileContent = fs.readFileSync(fullPath, 'utf-8');
        const userConfig: Config = JSON.parse(fileContent);
        return { ...defaultConfig, ...userConfig };
    } catch (error) {
        console.error('Error loading config:', error);
        return defaultConfig;
    }
};

export { loadConfig, defaultConfig };