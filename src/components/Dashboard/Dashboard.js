import React, { useEffect } from "react";
import "./Dashboard.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import SideBar from "../SideBar/SideBar";

const Dashboard = () => {
  const user = useSelector((state) => state.userSlice.data);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    // const token = localStorage.getItem("token");
  });
  return (
    <>
      <div className="dashboard-main">
        <SideBar />
      </div>
    </>
  );
};

export default Dashboard;
