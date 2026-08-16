import { createLogger, transports, format } from 'winston';
import { LoggingWinston } from '@google-cloud/logging-winston';

// Logger configuration with rotation
const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        // Console transport
        new transports.Console({
            format: format.simple()
        }),
        // File transport with rotation
        new transports.File({
            filename: 'combined.log',
            maxSize: '20m',
            maxFiles: '14d',
            tailable: true
        }),
        // Logging to Google Cloud
        new LoggingWinston()
    ]
});

export default logger;
