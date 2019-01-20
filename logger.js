const winston = require('winston');
const { combine, timestamp, printf } = winston.format;


const myFormat = printf(log => {
    return `${log.timestamp}: ${log.message}`;
  });
  
  const logger = winston.createLogger({
    format: combine(
        timestamp(),
        myFormat
      ),

    transports: [
        new winston.transports.Console({colorize: true, prettyPrint: true, }),
        new winston.transports.File({ filename: 'error.log', level: 'error'}),
        new winston.transports.File({filename: 'info.log', level: 'info' })
    ]
  });

  module.exports = logger;