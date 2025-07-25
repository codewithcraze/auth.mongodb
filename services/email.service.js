const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");  // For rendering the EJS template

const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.EMAIL_PASSWORD;

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});

// Helper to load and render EJS template
const renderTemplate = (templateName, data) => {
  const templatePath = path.join(process.cwd(), "templates", templateName);
  const templateContent = fs.readFileSync(templatePath, "utf-8");
  return ejs.render(templateContent, data);
};

// Send OTP Email
const sendOtpEmail = async (email, username, otp) => {
  const emailContent = renderTemplate("otp.template.ejs", { username, otp });

  return await transporter.sendMail({
    from: `"My Platform" <${EMAIL}>`,
    to: email,
    subject: "Your OTP Code",
    html: emailContent,
  });
};

// User Registration Acknowledgement Email
const registerAcknowledgement = async (email, username) => {
  const emailContent = renderTemplate("register.acknow.ejs", { username });

  return await transporter.sendMail({
    from: `"My Platform" <${EMAIL}>`,
    to: email,
    subject: "Welcome to My Platform!",
    html: emailContent,
  });
};

module.exports = {
  sendOtpEmail,
  registerAcknowledgement
};
