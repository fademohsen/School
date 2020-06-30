var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'school3091999@gmail.com',
      pass: 'fadefadE123'
    }
  });
  
module.exports = transporter;