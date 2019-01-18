const express = require('express');
const app = express();
const mongoose = require('mongoose');
const users = require('./routes/users');
const authentication = require('./routes/authentication');
const account = require('./routes/account');
const verification = require('./routes/verification');
const config = require("config");

const port = process.env.PORT || 8080;

if(!config.get('gmailUsername') || !config.get('gmailPassword') || !config.get('jwtPrivateKey')){
  console.error('You have to set auth_jwtPrivateKey, auth_gmailUsername, auth_gmailPassword in env variables');
  process.exit(1);
}

app.use(express.json());
app.use('/api/users', users);
app.use('/api/login', authentication);
app.use('/api/account', account);
app.use('/api/verification', verification);

mongoose.set('useCreateIndex', true);

app.listen(port, ()=>{
  console.log(`Listenning on port ${port}...`);
});

mongoose.connect('mmongodb://localhost:27017/appDB', { useNewUrlParser: true })
  .then(()=>console.log('Succesullfy connected to the DB'))
  .catch((err)=>console.log('Error', err));

