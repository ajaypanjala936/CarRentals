

const otpStore = {}; // Stores OTPs temporarily (better to use Redis in production)

const generateOtp = () => {
  return Math.floor(1000 + Math.random() * 9000).toString(); // Generates 4-digit OTP
};

const sendOtp = async (email) => {
  const otp = generateOtp();
  otpStore[email] = otp; // Store OTP for verification
  
  console.log(`OTP for ${email}: ${otp}`); // Replace with email/SMS API (e.g., Twilio, Nodemailer)
};

const verifyOtp = async (email, otp) => {
  if (otpStore[email] === otp) {
    delete otpStore[email]; // Remove OTP after successful verification
    return true;
  }
  return false;
};

module.exports = { sendOtp, verifyOtp };
