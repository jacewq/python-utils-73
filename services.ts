export interface PythonProcessConfig {
  executable: string;
  env: Record<string, string>;
  timeout: number;
}

export class PythonExecutor {
  private config: PythonProcessConfig;

  constructor(config: PythonProcessConfig) {
    this.config = config;
  }

  public async runScript(scriptPath: string, args: string[] = []): Promise<string> {
    const { spawn } = await import('child_process');
    
    return new Promise((resolve, reject) => {
      const process = spawn(this.config.executable, [scriptPath, ...args], {
        env: { ...process.env, ...this.config.env }
      });

      let output = '';
      let error = '';

      process.stdout.on('data', (data) => { output += data.toString(); });
      process.stderr.on('data', (data) => { error += data.toString(); });

      process.on('close', (code) => {
        if (code !== 0) reject(new Error(`Process failed: ${error}`));
        else resolve(output);
      });

      setTimeout(() => {
        process.kill();
        reject(new Error('Process execution timed out'));
      }, this.config.timeout);
    });
  }
}