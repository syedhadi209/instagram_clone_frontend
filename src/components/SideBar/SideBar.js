import React, { useState } from "react";
import "./SideBar.css";
import instagramLogo from "../../assets/images/instagram_white.png";
import { GoHomeFill } from "react-icons/go";
import { BsSearch } from "react-icons/bs";
import { PiPlusSquareBold } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import ProfileImage from "../ProfileImage/ProfileImage";
import { IoIosSettings } from "react-icons/io";
import { useSelector } from "react-redux";

const SideBar = () => {
  const [toggle, setToggle] = useState(false);
  const profile_image = useSelector(
    (state) => state.userSlice.data.profile_picture
  );
  console.log(profile_image);

  const handleToggle = () => {
    setToggle(!toggle);
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
            <button>
              <PiPlusSquareBold size={30} />
              Create
            </button>
            <button>
              <ProfileImage size={30} />
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
                  <ProfileImage size={30} /> Profile
                </button>
                <button style={{ background: "#3c3c3c" }}>Logout</button>
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
