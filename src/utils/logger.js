const winston = require("winston");

const logger = winston.createLogger({
  level: "verbose",
  transports: [
    new winston.transports.Console({ level: "debug" }),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
  ],
});

module.exports = { logger };