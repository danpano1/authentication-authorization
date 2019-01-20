const config = require('config');

module.exports = () => {
    if(!config.get('gmailUsername') || !config.get('gmailPassword') || !config.get('jwtPrivateKey')){
    console.error('You have to set auth_jwtPrivateKey, auth_gmailUsername, auth_gmailPassword in env variables');
    process.exit(1);
  }
}