import React from "react";
import "./Login.css";
import instagramLogo from "../../assets/images/Instagram_logo.png";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="login-main">
        <div className="login-box">
          <div className="login-upper">
            <div className="login-heading">
              <img src={instagramLogo} alt="logo" />
            </div>
            <div className="login-input">
              <input type="text" placeholder="Username, or Email" />
              <input type="password" placeholder="Password" />
            </div>
            <div className="login-button">
              <button>Log in</button>
            </div>
          </div>
          <div className="login-lower">
            <p>Don't have an account?</p>
            <span onClick={() => navigate("/auth/signup")}>Sign up</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
