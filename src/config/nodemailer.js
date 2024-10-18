import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

export function sendEmail(message) {
  console.log("Message object:", message);
  console.log("Employee details:", message.name, message.officeId, message.designation, message.phoneNumber, message.password);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Use environment variable
      pass: process.env.EMAIL_PASS,   // Use environment variable
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // Use environment variable
    to: message.email,
    subject: `🎉 Welcome to the Team, ${message.name}!`,
    text: `Hello ${message.name},\n\nYour account has been successfully created.\n\nHere are your credentials:\n\n- **Office ID**: ${message.officeId}\n- **Password**: ${message.password}\n\nWe are excited to have you on board!\n\nBest Regards,\nThe Team`,
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #333;">Hello ${message.name},</h2>
            <p style="font-size: 16px; line-height: 1.5;">We are thrilled to inform you that your account has been successfully created.</p>
            <h3 style="color: #555;">Your Credentials:</h3>
            <ul style="list-style: none; padding: 0;">
              <li><strong>Office ID:</strong> ${message.officeId}</li>
              <li><strong>Password:</strong> ${message.password}</li>
            </ul>
            <p style="font-size: 16px; line-height: 1.5;">We are excited to have you on board! If you have any questions, feel free to reach out.</p>
            <p style="font-weight: bold;">Best Regards,</p>
            <p style="font-weight: bold;">The Team</p>
          </div>
        </body>
      </html>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Error occurred: " + error.message);
    }
    console.log("Message sent: %s", info.messageId);
  });
}
