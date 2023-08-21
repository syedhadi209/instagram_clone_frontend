import React from "react";
import "./Home.css";
import bannerImage from "../../assets/images/banner.png";
import instagramLogo from "../../assets/images/Instagram_logo.png";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="home-page-main">
        <div className="home-page-left-contaner">
          <img src={bannerImage} alt="banner" />
        </div>
        <div className="home-page-right-contaner">
          <div className="home-page-upper">
            <div className="home-page-heading">
              <img src={instagramLogo} alt="logo" />
              <p>Sign up to see photos and videos from your friends.</p>
            </div>
            <div className="home-page-input">
              <input type="text" placeholder="Mobile Number or Email" />
              <input type="text" placeholder="Full Name" />
              <input type="text" placeholder="Username" />
              <input type="password" placeholder="Password" />
            </div>
            <div className="home-page-privacy-policy">
              <p>
                People who use our service may have uploaded your contact
                information to Instagram.{" "}
                <span style={{ color: "#02376B", cursor: "pointer" }}>
                  Learn More
                </span>
              </p>
              <p>
                By signing up, you agree to our{" "}
                <span style={{ color: "#02376B", cursor: "pointer" }}>
                  Terms , Privacy Policy
                </span>{" "}
                and{" "}
                <span style={{ color: "#02376B", cursor: "pointer" }}>
                  Cookies Policy
                </span>{" "}
                .
              </p>
            </div>
            <div className="home-page-sign-up">
              <button>Sign up</button>
            </div>
          </div>
          <div className="home-page-lower">
            <p>Have an account?</p>
            <span onClick={() => navigate("/auth/login")}>Log in</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
