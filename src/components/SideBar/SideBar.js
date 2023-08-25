import React, { useState } from "react";
import "./SideBar.css";
import instagramLogo from "../../assets/images/instagram_white.png";
import { GoHomeFill } from "react-icons/go";
import { BsSearch } from "react-icons/bs";
import { PiPlusSquareBold } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import ProfileImage from "../ProfileImage/ProfileImage";
import { IoIosSettings } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router";
import { removeUser } from "../../store/slices/UserSlice";
import { openModal } from "../../store/slices/ModalSlice";

const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const profile_image = useSelector(
    (state) => state.userSlice.data?.profile_picture
  );
  console.log(profile_image);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(removeUser());
    navigate("/");
  };
  return (
    <>
      <div className="side-bar-main">
        <div className="side-bar-header">
          <img src={instagramLogo} alt="logo" />
        </div>
        <div className="side-bar-content">
          <div className="side-bar-buttons">
            <button>
              <GoHomeFill size={30} />
              Home
            </button>
            <button>
              <BsSearch size={30} />
              Search
            </button>
            <button onClick={() => dispatch(openModal())}>
              <PiPlusSquareBold size={30} />
              Create
            </button>
            <button>
              <AiOutlineHeart size={30} />
              Notifications
            </button>
            <button>
              <ProfileImage src={profile_image} size={30} />
              Profile
            </button>
          </div>
          <div className="side-bar-options">
            {toggle && (
              <div className="toggle-container">
                <button>
                  <IoIosSettings size={30} /> Settings
                </button>
                <button>
                  <ProfileImage src={profile_image} size={30} /> Profile
                </button>
                <button
                  style={{ background: "#3c3c3c" }}
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </div>
            )}
            <button onClick={handleToggle}>
              <RxHamburgerMenu size={30} />
              More
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
