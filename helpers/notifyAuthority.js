require('dotenv').config(); 
const nodemailer = require("nodemailer");
const twilio = require("twilio");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const notifyAuthority = async (incident) => {
  try {
    // Email Notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.AUTHORITY_EMAIL,
      subject: `🚨 New Incident Reported: ${incident.category}`,
      html: `<h3>New Incident Reported</h3>
             <p><strong>Name:</strong> ${incident.name}</p>
             <p><strong>Category:</strong> ${incident.category}</p>
             <p><strong>Address:</strong> ${incident.address}</p>
             <p><strong>Pincode:</strong> ${incident.pincodeOfIncident}</p>
             <p><strong>Report:</strong> ${incident.report}</p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Authority notified by email.");

    // SMS Notification
    await twilioClient.messages.create({
      body: `🚨 New Incident: ${incident.category} at ${incident.address}. Report by ${incident.name}.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: process.env.AUTHORITY_PHONE,
    });
    console.log("✅ Authority notified by SMS.");
  } catch (error) {
    console.error("❌ Error notifying authority:", error);
  }
};

module.exports = notifyAuthority;
