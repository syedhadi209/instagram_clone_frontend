import React, { useEffect, useState } from "react";
import "./Notifications.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Notifications = () => {
  const [requests, setRequests] = useState(null);

  const getRequests = async () => {
    const data = {};
    const token = localStorage.getItem("token");
    await axios
      .post("http://127.0.0.1:8000/followers/get-requests/", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setRequests(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const acceptRequest = async (id) => {
    console.log("here");
    await axios
      .post(`http://127.0.0.1:8000/followers/accept-request/${id}/`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    getRequests();
  }, []);
  return (
    <div className="notifications-main">
      <h1>Notifications</h1>
      <div className="notifications-list">
        {requests?.map((request, index) => {
          return (
            <div className="notification-box" key={index}>
              <Link to={`/profile/${request?.user_id.username}`}>
                {request?.user_id.username}
              </Link>
              <button onClick={() => acceptRequest(request.id)}>
                {request.accepted ? "Accepted" : "Accept"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notifications;
