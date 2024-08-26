import nodemailer from "nodemailer";

export default async (email: string, subject: string, body: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port:465,
      auth: {
        user: "dubeyshweta7049@gmail.com",
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: "dubeyshweta7049@gmail.com",
      to: email,
      subject: subject,
      text: body,
    };
    const sendMail = await transporter.sendMail(mailOptions);
    if (!sendMail) throw "Failed to send mail";
  } catch (error) {
    throw error;
  }
};
