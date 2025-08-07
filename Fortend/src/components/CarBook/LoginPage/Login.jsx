

// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import "./Login.css";

// const Login = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [mobile, setMobile] = useState(location.state?.mobile || "");
//   const [email, setEmail] = useState(location.state?.email || "");
//   const [otp, setOtp] = useState("");
//   const [showOtpField, setShowOtpField] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleGetOtp = async () => {
//     if (!mobile || !email) {
//       alert("Please enter both mobile and email");
//       return;
//     }

//     setLoading(true);
//     try {
//       const { data } = await axios.post("http://localhost:5000/api/users/check-user", {
//         mobile,
//         email
//       });

//       if (!data.exists) {
//         alert("This number or email is not registered. Please create an account.");
//         return;
//       }

//       alert("OTP sent successfully! (Use: 1234)");
//       setShowOtpField(true);
//     } catch (error) {
//       alert(error.response?.data?.message || "Failed to check user");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogin = async () => {
//     if (!otp) {
//       alert("Please enter OTP");
//       return;
//     }

//     if (otp !== "1234") {
//       alert("Invalid OTP! Try again.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post("http://localhost:5000/api/users/login", {
//         mobile,
//         email
//       });

//       localStorage.setItem("loggedInUser", JSON.stringify({
//         name: response.data.user.name,
//         email: response.data.user.email,
//         mobile: response.data.user.mobile,
//         token: response.data.token
//       }));

//       alert(`WELCOME TO ATTO CARS, ${response.data.user.name.toUpperCase()}!`);
      
//       // Redirect to previous page if coming from search
//       if (location.state?.fromSearch) {
//         navigate(-1); // Go back to search page
//       } else {
//         navigate("/"); // Default to home
//       }
//     } catch (error) {
//       alert(error.response?.data?.message || "Login failed");
//       localStorage.removeItem("loggedInUser");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login to Atto Cars</h2>

//       <div className="input-group">
//         <label>Mobile Number</label>
//         <input
//           type="text"
//           placeholder="Enter registered mobile"
//           value={mobile}
//           onChange={(e) => setMobile(e.target.value)}
//         />
//       </div>

//       <div className="input-group">
//         <label>Email</label>
//         <input
//           type="email"
//           placeholder="Enter registered email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </div>

//       {!showOtpField ? (
//         <button 
//           className="otp-btn" 
//           onClick={handleGetOtp}
//           disabled={loading}
//         >
//           {loading ? "Checking..." : "Get OTP"}
//         </button>
//       ) : (
//         <>
//           <div className="input-group">
//             <label>Enter OTP</label>
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//             />
//           </div>
//           <button 
//             className="login-btn" 
//             onClick={handleLogin}
//             disabled={loading}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </>
//       )}

//       <div className="link-container">
//         <a href="/register" className="link">Create New Account</a>
//       </div>
//     </div>
//   );
// };

// export default Login;




import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobile, setMobile] = useState(location.state?.mobile || "");
  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    setIsLoggedIn(!!loggedInUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
    // Reset form fields
    setMobile("");
    setEmail("");
    setOtp("");
    setShowOtpField(false);
  };

  const handleGetOtp = async () => {
    if (!mobile || !email) {
      alert("Please enter both mobile and email");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:5000/api/users/check-user", {
        mobile,
        email
      });

      if (!data.exists) {
        alert("This number or email is not registered. Please create an account.");
        return;
      }

      alert("OTP sent successfully! (Use: 1234)");
      setShowOtpField(true);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to check user");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!otp) {
      alert("Please enter OTP");
      return;
    }

    if (otp !== "1234") {
      alert("Invalid OTP! Try again.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        mobile,
        email
      });

      localStorage.setItem("loggedInUser", JSON.stringify({
        name: response.data.user.name,
        email: response.data.user.email,
        mobile: response.data.user.mobile,
        token: response.data.token
      }));

      setIsLoggedIn(true);
      alert(`WELCOME TO ATTO CARS, ${response.data.user.name.toUpperCase()}!`);
      
      if (location.state?.fromSearch) {
        navigate(-1);
      } else {
        navigate("/");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
      localStorage.removeItem("loggedInUser");
    } finally {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return (
      <div className="login-container">
        <h2>Welcome Back!</h2>
        <p>You are already logged in.</p>
        <button 
          className="logout-btn" 
          onClick={handleLogout}
        >
          Logout
        </button>
        <div className="link-container">
          <button 
            className="link-btn"
            onClick={() => navigate("/")}
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <h2>Login to Atto Cars</h2>

      <div className="input-group">
        <label>Mobile Number</label>
        <input
          type="text"
          placeholder="Enter registered mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {!showOtpField ? (
        <button 
          className="otp-btn" 
          onClick={handleGetOtp}
          disabled={loading}
        >
          {loading ? "Checking..." : "Get OTP"}
        </button>
      ) : (
        <>
          <div className="input-group">
            <label>Enter OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <button 
            className="login-btn" 
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </>
      )}

      <div className="link-container">
        <a href="/register" className="link">Create New Account</a>
      </div>
    </div>
  );
};

export default Login;