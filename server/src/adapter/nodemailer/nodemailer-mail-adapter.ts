import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from './../mail-adapter';


const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "497c94e97abecf",
    pass: "f6ea84ae624f2b"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({body, subject}: SendMailData) {

    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Zaltron <lfzaltron@gmail.com>',
      subject,
      html: body
    })
  };

}