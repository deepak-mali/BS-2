import { createLogger, format, loggers, transports } from 'winston';
import chalk from 'chalk';
import moment from 'moment';

// Create logger instance.
export const logger = createLogger({
  transports: [
    new transports.Console({}),
		new transports.File({ filename: 'combined.log' }),
  ],

  // format log messages.
  format: format.printf((options) => {
    const level = options.level.toUpperCase();
    let message = `${moment().format()} - ${level}: `;
    if(options.message) {
      message = message + options.message;
    }
    return colorMessage(level, message);
  })
});

/**
 * @description - Color the log messages based on message level.
 * @param { string } level - log level.
 * @param { string } message - log message.
 * @returns { string } - coloured log message based on log level
 */
const colorMessage = (level: string, message: string): string => {
  if(level === 'INFO') {
    message = chalk.blue(message);
  } else if(level === 'WARN') {
    message = chalk.yellow(message);
  } else if(level === 'ERROR') {
    message = chalk.red(message);
  } else {
    message = chalk.magenta(message);
  }

  return message;
}