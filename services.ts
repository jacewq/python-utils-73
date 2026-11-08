export class ServiceError extends Error {
  constructor(public message: string, public code: string, public status?: number) {
    super(message);
    this.name = 'ServiceError';
  }
}

export const executeSafe = async <T>(operation: () => Promise<T>): Promise<T> => {
  try {
    return await operation();
  } catch (error) {
    if (error instanceof ServiceError) {
      throw error;
    }

    if (error instanceof Error) {
      throw new ServiceError(error.message, 'INTERNAL_ERROR', 500);
    }

    throw new ServiceError('An unexpected error occurred', 'UNKNOWN_ERROR', 500);
  }
};

export const validateResponse = (data: unknown): void => {
  if (data === null || data === undefined) {
    throw new ServiceError('Empty response received', 'EMPTY_RESPONSE', 204);
  }
};

export const processTask = async <T>(task: () => Promise<T>): Promise<T | null> => {
  try {
    const result = await executeSafe(task);
    validateResponse(result);
    return result;
  } catch (err) {
    console.error(`[ServiceTask] Error: ${(err as ServiceError).message}`);
    return null;
  }
};