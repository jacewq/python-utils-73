interface Config {
    host: string;
    port: number;
    useTls: boolean;
}

const defaultConfig: Config = {
    host: 'localhost',
    port: 8080,
    useTls: false,
};

/**
 * Function to get configuration settings.
 * @returns The configuration settings.
 */
function getConfig(): Config {
    return defaultConfig;
}

/**
 * Function to update configuration settings.
 * @param config - The new configuration settings.
 */
function updateConfig(config: Config): void {
    // Here we could add logic to update the configurations
    // with specifics like saving to a file or an environment variable
    console.log('Configuration updated:', config);
}

export { getConfig, updateConfig, Config };