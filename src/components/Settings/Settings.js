import React, { useEffect, useState } from "react";
import "./Settings.css";
import { useDispatch, useSelector } from "react-redux";
import ProfileImage from "../ProfileImage/ProfileImage";
import { useNavigate } from "react-router";
import axios from "axios";
import {
  setProfilePic,
  updateEmail,
  updateUsername,
} from "../../store/slices/UserSlice";
import { RotatingLines } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Settings = () => {
  const [updatedUsername, setUpdatedUsername] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useSelector((state) => state.userSlice.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function updateProfilePicture() {
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

  function updateProfile() {
    const token = localStorage.getItem("token");
    const data = {
      username: updatedUsername ? updatedUsername : currentUser.username,
      email: updatedEmail ? updatedEmail : currentUser.email,
    };

    axios
      .post("http://127.0.0.1:8000/auth/update-profile/", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.status) {
          dispatch(updateUsername(updatedUsername));
          dispatch(updateEmail(updatedEmail));
          toast.success(res.data.response, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          toast.error(res.data.response, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      });
  }

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, []);
  return (
    <div className="settings-main">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <h2>settings</h2>
      <ProfileImage size={200} src={currentUser?.profile_picture} />
      <div className="settings-input-fields">
        <label>Username</label>
        <input
          type="text"
          defaultValue={currentUser?.username}
          onChange={(e) => setUpdatedUsername(e.target.value)}
        />
      </div>
      <div className="settings-input-fields">
        <label>Email</label>
        <input
          type="text"
          defaultValue={currentUser?.email}
          onChange={(e) => setUpdatedEmail(e.target.value)}
        />
      </div>
      <div className="file-uploader">
        <label>Profile Picture</label>
        <input
          type="file"
          id="fileInput"
          class="file-input"
          onChange={(e) => setProfilePicture(e.target.files[0])}
        />
        <label htmlFor="fileInput" className="file-label">
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
          <button onClick={updateProfilePicture}>
            {isLoading ? (
              <RotatingLines width="15" strokeColor="white" />
            ) : (
              "Update Profile"
            )}
          </button>
        )}
      </div>
      <div className="settings-submit-button">
        <button onClick={updateProfile}>Submit</button>
      </div>
    </div>
  );
};

export default Settings;
