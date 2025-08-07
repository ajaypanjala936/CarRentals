



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Register.css";

// const Register = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     mobile: "",
//     email: "",
//     address: "",
//     otp: "",
//   });

//   const [showOtpField, setShowOtpField] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Update input fields dynamically
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Register user and send OTP
//   const handleRegister = async () => {
//     const { name, mobile, email, address } = formData;

//     if (!name || !mobile || !email || !address) {
//       alert("❌ Please fill all fields.");
//       return;
//     }

//     setLoading(true);
//     try {
//       // Register user
//       await axios.post("http://localhost:5000/api/users/register", { name, mobile, email, address });

//       // Send OTP
//       await axios.post("http://localhost:5000/api/users/send-otp", { email });
//       alert("✅ OTP sent to your email.");
//       setShowOtpField(true);
//     } catch (error) {
//       alert(error.response?.data?.message || "❌ Registration failed!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Verify OTP and complete registration
//   const handleVerifyOtp = async () => {
//     const { email, otp } = formData;

//     if (!otp) {
//       alert("❌ Please enter OTP.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post("http://localhost:5000/api/users/verify-otp", { email, otp });
//       alert(response.data.message);

//       // Save registered user locally after OTP verification
//       const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
//       registeredUsers.push(formData);
//       localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

//       // Redirect to login page
//       navigate("/login", { state: { mobile: formData.mobile } });
//     } catch (error) {
//       alert("❌ Invalid OTP! Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="register-container">
//       <h2>Create New Account</h2>

//       {!showOtpField ? (
//         <>
//           <div className="input-group">
//             <label>Name</label>
//             <input type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} />
//           </div>

//           <div className="input-group">
//             <label>Mobile Number</label>
//             <input type="text" name="mobile" placeholder="Enter mobile number" value={formData.mobile} onChange={handleChange} />
//           </div>

//           <div className="input-group">
//             <label>Email</label>
//             <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
//           </div>

//           <div className="input-group">
//             <label>Address</label>
//             <input type="text" name="address" placeholder="Enter your address" value={formData.address} onChange={handleChange} />
//           </div>

//           <button className="register-btn" onClick={handleRegister} disabled={loading}>
//             {loading ? "Processing..." : "Register"}
//           </button>
//         </>
//       ) : (
//         <>
//           <div className="input-group">
//             <label>Enter OTP (Sent to Email)</label>
//             <input type="text" name="otp" placeholder="Enter OTP" value={formData.otp} onChange={handleChange} />
//           </div>

//           <button className="verify-btn" onClick={handleVerifyOtp} disabled={loading}>
//             {loading ? "Verifying..." : "Verify OTP"}
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default Register;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    otp: "",
  });
  const [errors, setErrors] = useState({});
  const [showOtpField, setShowOtpField] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Check if user exists
      const { data } = await axios.post("http://localhost:5000/api/users/check-user", {
        email: formData.email,
        mobile: formData.mobile
      });

      if (data.exists) {
        alert("User already exists");
        return;
      }

      // Register user
      await axios.post("http://localhost:5000/api/users/register", {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        address: formData.address
      });

      // Send OTP
      await axios.post("http://localhost:5000/api/users/send-otp", {
        email: formData.email
      });

      setShowOtpField(true);
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!formData.otp.trim()) {
      alert("Please enter OTP");
      return;
    }

    setLoading(true);
    try {
      // Verify OTP
      const { data } = await axios.post("http://localhost:5000/api/users/verify-otp", {
        email: formData.email,
        otp: formData.otp
      });

      // Get user data
      const userRes = await axios.post("http://localhost:5000/api/users/get-user", {
        email: formData.email
      });

      // Store in localStorage
      localStorage.setItem("loggedInUser", JSON.stringify({
        ...userRes.data.user,
        token: data.token
      }));

      setRegistrationSuccess(true);
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      alert(error.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Create New Account</h2>

      {registrationSuccess ? (
        <div className="success-message">
          <h3>✅ Registration Successful!</h3>
          <p>Redirecting to home page...</p>
        </div>
      ) : !showOtpField ? (
        <>
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "error" : ""}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="input-group">
            <label>Mobile Number</label>
            <input
              type="text"
              name="mobile"
              placeholder="Enter 10-digit mobile number"
              value={formData.mobile}
              onChange={handleChange}
              maxLength="10"
              className={errors.mobile ? "error" : ""}
            />
            {errors.mobile && <span className="error-text">{errors.mobile}</span>}
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="input-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              className={errors.address ? "error" : ""}
            />
            {errors.address && <span className="error-text">{errors.address}</span>}
          </div>

          <button 
            className="register-btn" 
            onClick={handleRegister} 
            disabled={loading}
          >
            {loading ? "Processing..." : "Register"}
          </button>
        </>
      ) : (
        <>
          <div className="otp-instructions">
            <p>We've sent a 6-digit OTP to your email: <strong>{formData.email}</strong></p>
          </div>

          <div className="input-group">
            <label>Enter OTP</label>
            <input
              type="text"
              name="otp"
              placeholder="Enter 6-digit OTP"
              value={formData.otp}
              onChange={handleChange}
              maxLength="6"
            />
          </div>

          <button 
            className="verify-btn" 
            onClick={handleVerifyOtp} 
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </>
      )}
    </div>
  );
};

export default Register;





