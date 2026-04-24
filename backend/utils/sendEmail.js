const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendRegistrationEmail = async ({ to, name, event }) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: `Registration Confirmed - ${event.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b;">
        <h2 style="color: #16a34a;">Registration Confirmed 🎉</h2>
        <p>Hi ${name || "User"},</p>
        <p>Your registration for the following event has been confirmed.</p>

        <div style="background: #f8fafc; padding: 16px; border-radius: 10px; border: 1px solid #e2e8f0;">
          <h3 style="margin-top: 0;">${event.title}</h3>
          <p><strong>Date:</strong> ${event.date}</p>
          <p><strong>Time:</strong> ${event.time}</p>
          <p><strong>Location:</strong> ${event.location}</p>
          <p><strong>Category:</strong> ${event.category}</p>
          <p><strong>Price:</strong> ₹${event.price}</p>
        </div>

        <p style="margin-top: 16px;">
          Please keep a screenshot or download your ticket from the dashboard.
        </p>

        <p>Thanks,<br/>Eventora Team</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendRegistrationEmail;