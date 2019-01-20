const mongoose = require('mongoose');
const logger = require('../logger');

module.exports = () =>{

    mongoose.set('useCreateIndex', true);
   
    mongoose.connect('mmongodb://localhost:27017/appDB', { useNewUrlParser: true })
        .then(()=>logger.info('Succesullfy connected to the DB'))
        .catch((err)=>console.log('Error', err));
};