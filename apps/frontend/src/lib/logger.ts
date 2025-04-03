import log4js from 'log4js';

export const logger = log4js.getLogger();

log4js.configure({
  appenders: {
    console: {
      type: 'console',
    },
  },
  categories: {
    default: { appenders: ['console'], level: 'info' },
  },
});
