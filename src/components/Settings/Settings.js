import React, { useEffect, useState } from "react";
import "./Settings.css";
import { useDispatch, useSelector } from "react-redux";
import ProfileImage from "../ProfileImage/ProfileImage";
import { useNavigate } from "react-router";
import axios from "axios";
import { setProfilePic } from "../../store/slices/UserSlice";
import { RotatingLines } from "react-loader-spinner";

const Settings = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useSelector((state) => state.userSlice.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function updateProfile() {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    const url = "https://api.cloudinary.com/v1_1/djbu7u6rk/image/upload";
    const formData = new FormData();
    formData.append("file", profilePicture);
    formData.append("upload_preset", "instagram_clone");
    formData.append("cloud_name", "djbu7u6rk");

    await axios.post(url, formData).then((res) => {
      axios
        .post(
          "http://127.0.0.1:8000/auth/profile-update/",
          { profile_url: res.data.url },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((r) => {
          console.log(r.data);
          dispatch(setProfilePic(r.data.url));
          setIsLoading(false);
          setProfilePicture(null);
        })
        .catch((err) => {
          navigate("/");
        });
    });
  }

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, []);
  return (
    <div className="settings-main">
      <h2>settings</h2>
      <ProfileImage size={200} src={currentUser?.profile_picture} />
      <div className="settings-input-fields">
        <label>Username</label>
        <input type="text" value={currentUser?.username} />
      </div>
      <div className="settings-input-fields">
        <label>Email</label>
        <input type="text" value={currentUser?.email} />
      </div>
      <div class="file-uploader">
        <label>Profile Picture</label>
        <input
          type="file"
          id="fileInput"
          class="file-input"
          onChange={(e) => setProfilePicture(e.target.files[0])}
        />
        <label for="fileInput" class="file-label">
          <span>Choose a file</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M4 18h16v2H4zm10-14l-5 5h3v6h4V9h3l-5-5z" />
          </svg>
        </label>
        {profilePicture && (
          <button onClick={updateProfile}>
            {isLoading ? (
              <RotatingLines width="15" strokeColor="white" />
            ) : (
              "Update Profile"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Settings;
