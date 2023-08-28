import React, { useEffect, useState } from "react";
import "./SearchBox.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const SearchBox = ({ user }) => {
  const currentUser = useSelector((state) => state.userSlice.data);
  const [isFollower, setIsFollower] = useState(false);

  function addFollower() {
    user.followers.push({ user_id: currentUser.id });
    setIsFollower(true);
  }

  function removeFollower() {
    const lst = [];
    user.followers.forEach((element) => {
      if (element.user_id !== currentUser.id) {
        lst.push(element);
      }
    });
    user.followers = lst;
    setIsFollower(false);
  }

  function checkFollow() {
    user.followers.forEach((element) => {
      if (element.user_id === currentUser.id) {
        setIsFollower(true);
      }
    });
  }

  async function handleFollow(followingId) {
    const token = localStorage.getItem("token");
    await axios
      .post(
        `http://127.0.0.1:8000/followers/follow/${followingId}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        if (!res.data.response) {
          removeFollower();
        } else {
          addFollower();
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  useEffect(() => {
    checkFollow();
  }, []);
  return (
    <div className="users-box">
      <Link to={`/profile/${user?.username}`}>{user?.username}</Link>
      {user?.id !== currentUser?.id ? (
        <button onClick={() => handleFollow(user.id)}>
          {isFollower ? "Unfollow" : "Follow"}
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default SearchBox;
