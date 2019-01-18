const nodemailer = require('nodemailer');
const config = require('config');

async function createTransporter(user, urlWithVerificationToken){
     const transporter = await nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: config.get('gmailUsername'),
          pass:  config.get('gmailPassword')
    }
   });
   let mailOptions = {
    from: config.get('gmailUsername'),
    to: user.email, 
    subject: "E-mail verification",
    html: `Hello ${user.name}, to verificate your account please enter: ${urlWithVerificationToken}`
  };
  const info = await transporter.sendMail(mailOptions)
  console.log(info);

}


 module.exports = createTransporter;