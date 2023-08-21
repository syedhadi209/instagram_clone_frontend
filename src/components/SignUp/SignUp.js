import React from "react";
import "./SignUp.css";
import instagramLogo from "../../assets/images/Instagram_logo.png";
import { useNavigate } from "react-router";

const SignUp = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="signup-main">
        <div className="signup-box">
          <div className="signup-upper">
            <div className="signup-heading">
              <img src={instagramLogo} alt="logo" />
            </div>
            <div className="signup-input">
              <input type="text" placeholder="Mobile Number or Email" />
              <input type="text" placeholder="Full Name" />
              <input type="text" placeholder="Username" />
              <input type="password" placeholder="Password" />
            </div>
            <div className="signup-button">
              <button>Log in</button>
            </div>
          </div>
          <div className="signup-lower">
            <p>Have an account?</p>
            <span onClick={() => navigate("/auth/login")}>Log in</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
