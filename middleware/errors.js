const logger = require('../logger');

module.exports = (err, req, res, next)=>{
    res.status(500).send('Something went wrong...');
    logger.error(err.message);
    
}