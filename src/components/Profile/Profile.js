import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useParams } from "react-router";
import ProfileImage from "../ProfileImage/ProfileImage";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdSettings } from "react-icons/md";
import axios from "axios";
import Post from "../Post/Post";

const Profile = () => {
  const { username } = useParams();
  const currentUser = useSelector((state) => state.userSlice.data);
  const [profileData, setProfileData] = useState(null);
  const [profilePosts, setProfilePosts] = useState(null);
  const [showPosts, setShowPosts] = useState(false);

  const getProfileData = async () => {
    await axios
      .post("http://127.0.0.1:8000/auth/get-profile/", { username: username })
      .then((res) => {
        setProfileData(res.data);
        getProfilePosts(res.data.id);
      });
  };

  function isFollower() {
    let flag = false;
    profileData?.followers.forEach((follower) => {
      if (follower.user_id.id === currentUser?.id) {
        flag = true;
      }
    });
    return flag;
  }

  const checkFollow = () => {
    console.log("profile", profileData);
    let flag = false;
    profileData?.followers.forEach((follower) => {
      console.log("follower", follower, currentUser.id);
      if (follower?.user_id.id === currentUser.id && follower?.accepted) {
        flag = true;
      }
    });
    // console.log(flag);
    setShowPosts(flag);
  };

  async function addFollow(followingId) {
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
          const button = document.getElementById("follow-button");
          button.innerText = "Follow";
        } else {
          const button = document.getElementById("follow-button");
          button.innerText = "Unfollow";
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  const getProfilePosts = async (user_id) => {
    await axios
      .post("http://127.0.0.1:8000/posts/profile-posts/", { user_id: user_id })
      .then((res) => {
        setProfilePosts(res.data);
        // console.log("posts", res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProfileData();
  }, []);

  useEffect(() => {
    checkFollow();
  }, [profileData]);

  return (
    <div className="user-profile-main">
      <div className="user-profile-header">
        <div className="user-profile-header-left">
          <div className="user-image">
            <ProfileImage src={profileData?.profile_picture} size={150} />
          </div>
          <div className="user-info">
            <h2>{profileData?.username}</h2>
            <p>{profileData?.email}</p>
          </div>
        </div>
        <div className="user-profile-header-right">
          {currentUser?.username === username ? (
            <Link to={"/settings"}>
              <MdSettings size={50} />
            </Link>
          ) : (
            <button
              onClick={() => addFollow(profileData?.id)}
              id="follow-button"
            >
              {isFollower() ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
      </div>
      {showPosts || currentUser?.username === username ? (
        <div className="user-profile-posts">
          {profilePosts?.map((post) => {
            return <Post postData={post} key={post.id} />;
          })}
        </div>
      ) : (
        <h2 style={{ width: "100%", textAlign: "center", marginTop: "30px" }}>
          Account is private follow to see content
        </h2>
      )}
    </div>
  );
};

export default Profile;
