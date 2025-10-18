type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'none';

class Logger {
  private _level: LogLevel = __DEV__ ? 'debug' : 'info';

  set level(newLevel: LogLevel) {
    this._level = newLevel;
  }

  get level() {
    return this._level;
  }

  private shouldLog(level: LogLevel) {
    const order: Record<LogLevel, number> = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3,
      none: 4,
    };
    return order[level] >= order[this._level];
  }

  debug(...args: any[]) {
    if (this._level === 'debug') console.debug('[DEBUG]', ...args);
  }
  info(...args: any[]) {
    if (this.shouldLog('info')) console.info('[INFO]', ...args);
  }
  warn(...args: any[]) {
    if (this.shouldLog('warn')) console.warn('[WARN]', ...args);
  }
  error(...args: any[]) {
    if (this.shouldLog('error')) console.error('[ERROR]', ...args);
  }
}

export const logger = new Logger();
