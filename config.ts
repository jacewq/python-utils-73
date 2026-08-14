enum LogLevel { DEBUG, INFO, WARN, ERROR }

interface Config {
    logLevel: LogLevel;
    apiEndpoint: string;
    timeout: number;
}

const defaultConfig: Config = {
    logLevel: LogLevel.INFO,
    apiEndpoint: 'https://api.example.com',
    timeout: 5000,
};

const validateConfig = (config: Partial<Config>): Config => {
    return {
        logLevel: config.logLevel || defaultConfig.logLevel,
        apiEndpoint: config.apiEndpoint || defaultConfig.apiEndpoint,
        timeout: config.timeout !== undefined ? config.timeout : defaultConfig.timeout,
    };
};

const getConfig = (customConfig: Partial<Config>): Config => {
    const validatedConfig = validateConfig(customConfig);
    return validatedConfig;
};

export { LogLevel, Config, getConfig };