import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_MAIL_HOST,
  port: +process.env.SMTP_MAIL_PORT,
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASSWORD,
  },
});

export default function sendEmail(to, subject, html, cb) {
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to,
    subject,
    html,
  };

  transporter.sendMail(mailOptions, cb);
}
