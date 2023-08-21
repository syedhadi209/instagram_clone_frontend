import React, { useEffect } from "react";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import { setUser } from "../../store/slices/UserSlice";

const Home = () => {
  const user = useSelector((state) => state.userSlice.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    } else {
      if (localStorage.getItem("token")) {
        try {
          const token = localStorage.getItem("token");
          const headers = {
            Authorization: `Bearer ${token}`,
          };
          axios
            .get("http://127.0.0.1:8000/auth/get-user/", { headers })
            .then((res) => {
              dispatch(setUser(res.data));
              navigate("/dashboard");
            });
        } catch (error) {
          console.log("ERROR", error.message);
          localStorage.removeItem("token");
          navigate("/auth/signup");
        }
      } else {
        navigate("/auth/signup");
      }
    }
  });
  return <></>;
};

export default Home;
