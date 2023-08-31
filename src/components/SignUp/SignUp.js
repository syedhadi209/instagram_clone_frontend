import React, { useState } from "react";
import "./SignUp.css";
import bannerImage from "../../assets/images/banner.png";
import instagramLogo from "../../assets/images/Instagram_logo.png";
import { useNavigate } from "react-router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submiHandler = () => {
    setError("");
    setIsLoading(true);
    if (email && username && fullName && password) {
      const url = "http://127.0.0.1:8000/auth/signup/";
      const data = {
        first_name: fullName,
        username: username,
        email: email,
        password: password,
      };
      axios
        .post(url, data)
        .then((res) => {
          if (res.data.error) {
            setError(res.data.error);
            setIsLoading(false);
          } else {
            setIsLoading(false);
            console.log("HERE");
            navigate("/auth/login");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setIsLoading(false);
        });
    }
  };
  return (
    <>
      <div className="home-page-main">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <div className="home-page-left-contaner">
          <img src={bannerImage} alt="banner" />
        </div>
        <div className="home-page-right-contaner">
          <div className="home-page-upper">
            <div className="home-page-heading">
              <img src={instagramLogo} alt="logo" />
              <p>Sign up to see photos and videos from your friends.</p>
            </div>
            {error && <div className="home-page-error">{error}</div>}
            <div className="home-page-input">
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Full Name"
                onChange={(e) => setFullName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
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
              <button onClick={submiHandler}>
                {isLoading ? (
                  <RotatingLines width="15" strokeColor="white" />
                ) : (
                  "Sign up"
                )}
              </button>
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

export default SignUp;
