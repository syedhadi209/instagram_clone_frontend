import React, { useState } from "react";
import "./Login.css";
import instagramLogo from "../../assets/images/Instagram_logo.png";
import { useNavigate } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/UserSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitHandler = () => {
    setError("");
    const url = "http://127.0.0.1:8000/auth/login/";
    const data = {
      username: username,
      password: password,
    };
    axios.post(url, data).then((res) => {
      if (res.data.error) {
        setError(res.data.error);
      } else {
        localStorage.setItem("token", res.data.access);
        dispatch(setUser(res.data.user));
        console.log(res.data);
        navigate("/");
      }
    });
  };
  return (
    <>
      <div className="login-main">
        <div className="login-box">
          <div className="login-upper">
            <div className="login-heading">
              <img src={instagramLogo} alt="logo" />
            </div>
            {error && <div className="home-page-error">{error}</div>}
            <div className="login-input">
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
            <div className="login-button">
              <button onClick={submitHandler}>Log in</button>
            </div>
          </div>
          <div className="login-lower">
            <p>Don't have an account?</p>
            <span onClick={() => navigate("/")}>Sign up</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
