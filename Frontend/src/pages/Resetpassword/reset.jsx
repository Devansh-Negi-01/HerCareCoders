import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './reset.css';
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import emailjs from 'emailjs-com'; // Ensure you've imported emailjs

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState(''); // User inputted OTP
  const [error, setError] = useState('');
  const [message, setMessage] = useState(''); // To display success message
  const [showPassword, setShowPassword] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Function to send OTP via email
  const handleSendOtp = async () => {
    try {
      const generatedOtp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP

      const templateParams = {
        to_email: email, // Set the email inputted by the user
        otp: generatedOtp,
      };

      // Send OTP via EmailJS
      const result = await emailjs.send(
        'service_2nppr4i', // Your EmailJS Service ID
        'template_igj4wna', // Your EmailJS Template ID
        templateParams,
        'rWwm79W-1H0cKHJ1t' // Your EmailJS User ID
      );

      setOtp(generatedOtp); // Store generated OTP in state
      setMessage('OTP sent to your email!');
      console.log(result.text); 
    } catch (err) {
      console.error('Error sending OTP:', err);
      setError('Error sending OTP. Please try again.');
    }
  };

  // Handle password reset after OTP verification
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (enteredOtp == otp) {
      //api call 
      const response = await axios.post('http://localhost:3000/user/resetpassword',{
        email : email,
        password : password
      })
      setMessage(response.data.msg);
    } else {
      setError('Invalid OTP!');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${backendUrl}/auth/google`;
  };

  return (
    <div className="reset-container">
      <div className="reset-card">
        <h2 className="reset-title">Reset Password</h2>
        <form onSubmit={handleResetPassword}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`input-field ${error ? "error" : ""}`}
            />
            <button type="button" onClick={handleSendOtp} className="send-otp-btn">Send OTP</button>
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="OTP"
              value={enteredOtp}
              onChange={(e) => setEnteredOtp(e.target.value)}
              className={`input-field ${error ? "error" : ""}`}
            />
          </div>

          <div className="form-group relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`input-field ${error ? "error" : ""}`}
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>} {/* Show success message */}

          <button type="submit" className="reset-button">
            Reset Password
          </button>
        </form>

        <div className="google-login-container">
          <button onClick={handleGoogleLogin} className="google-login-btn">
            <FaGoogle className="google-icon" /> Sign in with Google
          </button>
        </div>

        <div className="redirect-links">
          <p className="redirect-text">
            Don't have an account? <span className="redirect-link" onClick={() => navigate('/signup')}>Sign Up</span>
          </p>
          <p className="redirect-text">
            Remember your password? <span className="redirect-link" onClick={() => navigate('/login')}>Login</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
