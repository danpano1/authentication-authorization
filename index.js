const express = require('express');
const app = express();
const logger = require('./logger');


require('./startup/check')();
require('./startup/middleware')(app);
require('./startup/mongoDB')();
require('./startup/unhandledErrors')();



const port = process.env.PORT || 8080;

app.listen(port, ()=>{
  logger.info(`Listenning on port ${port}...`);
});





