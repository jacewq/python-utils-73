export interface PerformanceData {
    executionTime: number;
    memoryUsage: number;
    cpuLoad: number;
}

export type PerformanceMetrics = {
    startTime: Date;
    endTime: Date;
    data: PerformanceData;
};

export function logPerformanceMetrics(metrics: PerformanceMetrics): void {
    const executionTime = metrics.endTime.getTime() - metrics.startTime.getTime();
    console.log(`Execution Time: ${executionTime}ms`);
    console.log(`Memory Usage: ${metrics.data.memoryUsage}MB`);
    console.log(`CPU Load: ${metrics.data.cpuLoad}%`);
}

export function optimizePerformance(data: PerformanceData): PerformanceData {
    const optimizedData = {
        ...data,
        executionTime: data.executionTime * 0.9, // simulate optimization
        memoryUsage: data.memoryUsage * 0.95,
        cpuLoad: data.cpuLoad * 0.9,
    };
    logPerformanceMetrics({
        startTime: new Date(),
        endTime: new Date(Date.now() + optimizedData.executionTime),
        data: optimizedData,
    });
    return optimizedData;
}