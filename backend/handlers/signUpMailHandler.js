const nodemailer = require('nodemailer');

const signupMailHandler = async (recepientMail, firstName, lastName) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: process.env.ADMIN_MAIL_ADDRESS,
      pass: process.env.ADMIN_MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.ADMIN_MAIL_ADDRESS,
    to: recepientMail,
    subject: 'Registration Successful',
    html: `<table cellspacing="0" cellpadding="0" style="width: 100%; background-color: #3498db; color: #fff;">
    <tr>
      <td style="padding: 20px; text-align: center;">
        <h1 style="margin: 0;">Abasay-Today</h1>
        <p style="font-size: 18px; margin: 10px 0;">Welcome you to our platform!</p>
      </td>
    </tr>
  </table>

  <!-- Main Content -->
  <table cellspacing="0" cellpadding="0" style="width: 100%; padding: 20px;">
    <tr>
      <td>
        <h2 style="color: #333;">Hello ${firstName + ' ' + lastName},</h2>
        <p style="font-size: 16px; color: #555;">Thank you for signing up to our platform, we promise to offer you the best of our services, Thank you.</p>

        <p style="font-size: 14px; color: #777;">If you have any questions or concerns, feel free to reply to this email.</p>

        <p style="font-size: 14px; color: #777;">Best regards,<br/>The Abasay-Today Team.</p>
      </td>
    </tr>
  </table>

  <!-- Footer -->
  <table cellspacing="0" cellpadding="0" style="width: 100%; background-color: #333; color: #fff; text-align: center; padding: 10px 0;">
    <tr>
      <td>
        <p style="margin: 0;">© 2024 Abasay-Today. All rights reserved.</p>
      </td>
    </tr>
  </table>`,
  };

  const sendMessage = transporter.sendMail(mailOptions);

  return sendMessage;
};

module.exports = signupMailHandler;
