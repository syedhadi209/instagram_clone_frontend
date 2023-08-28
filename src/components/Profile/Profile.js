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

  const getProfileData = async () => {
    await axios
      .post("http://127.0.0.1:8000/auth/get-profile/", { username: username })
      .then((res) => {
        setProfileData(res.data);
        console.log(res.data);
        getProfilePosts(res.data.id);
      });
  };

  const getProfilePosts = async (user_id) => {
    await axios
      .post("http://127.0.0.1:8000/posts/profile-posts/", { user_id: user_id })
      .then((res) => {
        setProfilePosts(res.data);
        console.log("posts", res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProfileData();
    console.log(profileData);
  }, []);
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
          {currentUser.username === username ? (
            <Link to={"/settings"}>
              <MdSettings size={50} />
            </Link>
          ) : (
            <button>Follow</button>
          )}
        </div>
      </div>
      <div className="user-profile-posts">
        {profilePosts?.map((post) => {
          return <Post postData={post} key={post.id} />;
        })}
      </div>
    </div>
  );
};

export default Profile;
