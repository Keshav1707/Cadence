import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = () => {
    toast.success("Signup successful!");
    navigate("/login");
  };

  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        <img
          className="homePageLogo"
          src="/cadence-logo.png"
          alt="code-sync-logo"
        />
        <h4 className="mainLabel">Sign Up</h4>
        <form>
          <div className="inputGroup">
            {/* New textbox for Full Name */}
            <input
              type="text"
              className="inputBox"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
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
              <a href="/signup" className="createNewBtn">
                new account
              </a>
            </span>
            <button
              type="button" // Use type="button" to prevent form submission
              className="btn loginBtn"
              onClick={handleSignUp}
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

export default Signup;
