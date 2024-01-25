import axios from "axios";
import React, { useState } from "react";

import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin =async() => {
    try {
      const response = await axios.post("http://localhost:5000/login",{
        email,
        password,
      });

      if (response.status===200) {
        const user = await response.data;
        // Handle successful login (e.g., store token in local storage)
        console.log('Login successful:', user);
        
        toast.success("Login successful!");
        navigate("/");
      } else {
        // Handle login failure (e.g., show error message)
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }

  };

  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        <img
          className="homePageLogo"
          src="/cadence-logo.png"
          alt="code-sync-logo"
        />
        <h4 className="mainLabel">SignUp</h4>
        <form>
          <div className="inputGroup">
            <input
              type="email"
              className="inputBox"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="passwordWrapper inputBox">
              <input
                type={showPassword ? "text" : "password"}
                className="inputBox"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="passwordToggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>
            <span className="createInfo">
              If you don't have an account then create &nbsp;
              <a href="/login" className="createNewBtn">
                new account
              </a>
            </span>
            <button
              type="button" // Use type="button" to prevent form submission
              className="btn loginBtn"
              onClick={handleLogin}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
      <footer>
        <h4>
          Built with 💛 &nbsp; by &nbsp;
          <a href="https://github.com/Keshav1707/Cadence">Keshav and Chinmay</a>
        </h4>
      </footer>
    </div>
  );
};
export default Login;
