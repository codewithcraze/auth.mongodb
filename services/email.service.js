const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

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

// Mailgen configuration
const mailGenerator = new Mailgen({
  theme: "default",
   product: {
        // Appears in header & footer of e-mails
        name: 'Travomint',
        link: 'https://travomint.in/'
        // Optional product logo
        // logo: 'https://mailgen.js/img/logo.png'
    }
});

// Send OTP Email

const sendOtpEmail = async (email, username, otp) => {
  const emailBody = {
    body: {
      name: `${username || "User"}`,  
      intro: `Welcome to My Platform!`,
      action: {
        instructions: `Your One-Time Password (OTP):`,
        button: {
          color: "#22BC66", 
          text: `${otp}`,   
          link: "#"         
        },
      },
      outro: `This OTP will expire in 5 minutes. If you didn’t request it, please ignore this email.`,
      signature: "Thanks",
    },
  };

  // Generate the email content
  const emailContent = mailGenerator.generate(emailBody);

  // Send email
  return await transporter.sendMail({
    from: `"My Platform" <${EMAIL}>`,
    to: email,
    subject: "Your OTP Code",
    html: emailContent,
  });
};




module.exports = {
  sendOtpEmail,
};
