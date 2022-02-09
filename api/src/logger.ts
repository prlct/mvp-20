import winston from 'winston';
import { Loggly } from 'winston-loggly-bulk';
import config from 'config';

const { isDev, env } = config;

const getFormat = () => {
  if (isDev) {
    return winston.format.combine(
      winston.format.colorize(),
      winston.format.splat(),
      winston.format.simple(),
    );
  }

  return winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp(),
    winston.format.json(),
  );
};

class PaperclipLogger {
  _logger: any;

  constructor() {
    const transports: any[] = [
      new winston.transports.Console({
        level: isDev ? 'debug' : 'info',
      }),
    ];

    this._logger = winston.createLogger({
      exitOnError: false,
      transports,
      format: getFormat(),
    });
  }

  warn(mess: any) {
    this._logger.warn(mess);
  }

  debug(mess: any) {
    this._logger.debug(mess);
  }

  info(mess: any) {
    this._logger.info(mess);
  }

  error(mess: any) {
    // eslint-disable-next-line no-console
    console.error(mess);
    this._logger.error(mess);
  }
}

export default new PaperclipLogger();
