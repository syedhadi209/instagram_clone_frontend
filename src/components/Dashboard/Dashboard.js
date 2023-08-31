import React, { useEffect } from "react";
import "./Dashboard.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import MainWorkFlow from "../MainWorkFlow/MainWorkFlow";

const Dashboard = () => {
  const user = useSelector((state) => state.userSlice.data);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  });

  return (
    <>
      <div className="dashboard-main">
        <MainWorkFlow />
      </div>
    </>
  );
};

export default Dashboard;
