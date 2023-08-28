import React, { useEffect, useRef, useState } from "react";
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
import { Link } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const boxRef = useRef(null);
  const [toggle, setToggle] = useState(false);
  const currentUser = useSelector((state) => state.userSlice.data);
  const profile_image = useSelector(
    (state) => state.userSlice.data?.profile_picture
  );
  const handleToggle = () => {
    setToggle(!toggle);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(removeUser());
    navigate("/");
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
    const handleClickOutside = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setToggle(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <div className="side-bar-main">
        <div className="side-bar-header">
          <img src={instagramLogo} alt="logo" />
        </div>
        <div className="side-bar-content">
          <div className="side-bar-buttons">
            <Link to={"Dashboard"}>
              <button>
                <GoHomeFill size={30} />
                Home
              </button>
            </Link>
            <Link to={"search"}>
              <button>
                <BsSearch size={30} />
                Search
              </button>
            </Link>
            <button
              onClick={() => {
                dispatch(openModal());
                navigate("/");
              }}
            >
              <PiPlusSquareBold size={30} />
              Create
            </button>
            <Link to={`/profile/${currentUser?.username}`}>
              <button>
                <ProfileImage src={profile_image} size={30} />
                Profile
              </button>
            </Link>
          </div>
          <div className="side-bar-options">
            {toggle && (
              <div className="toggle-container" ref={boxRef}>
                <Link to={"settings"}>
                  <button>
                    <IoIosSettings size={30} /> Settings
                  </button>
                </Link>
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
