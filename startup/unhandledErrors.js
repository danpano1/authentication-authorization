const logger = require('../logger');

module.exports = () => {
    
process.on('uncaughtException', (err)=>{
    logger.error(err.message);
    process.exit(1);
})

process.on('unhandledRejection', (err)=>{
    logger.error(err.message);
    process.exit(1);
})

}