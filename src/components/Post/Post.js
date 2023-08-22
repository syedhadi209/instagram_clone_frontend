import React from "react";
import "./Post.css";
import ProfileImage from "../ProfileImage/ProfileImage";
import { SlOptions } from "react-icons/sl";
import Carousal from "../Carousal/Carousal";
import ins from "../../assets/images/Instagram_logo.png";
import black from "../../assets/images/instagram_white.png";
import ban from "../../assets/images/banner.png";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";

const Post = () => {
  const items = [ins, black, ban];
  return (
    <>
      <div className="main-posts-area">
        <div className="main-post-body">
          <div className="post-header">
            <div className="post-author">
              <ProfileImage size={30} />
              <p>Post Auther</p>
            </div>
            <button>
              <SlOptions size={25} color="white" />
            </button>
          </div>
          <div className="post-attachements">
            <Carousal items={items} />
          </div>
          <div className="post-actions">
            <AiOutlineHeart size={25} cursor={"pointer"} title="Like Post" />
            <FaRegComment size={25} cursor={"pointer"} title="Comment" />
          </div>
          <div className="post-likes">8111 Likes</div>
          <div className="post-description">
            <strong>Author Name</strong>
            <p>Description</p>
          </div>
          <div className="post-comments">post comments</div>
          <div className="post-add-comment">
            <input type="text" placeholder="Add a Comment..." />
            <button>Post</button>
          </div>
        </div>
        <div className="main-post-body">
          <div className="post-header">
            <div className="post-author">
              <ProfileImage size={30} />
              <p>Post Auther</p>
            </div>
            <button>
              <SlOptions size={25} color="white" />
            </button>
          </div>
          <div className="post-attachements">
            <Carousal items={items} />
          </div>
          <div className="post-actions">
            <AiOutlineHeart size={25} cursor={"pointer"} title="Like Post" />
            <FaRegComment size={25} cursor={"pointer"} title="Comment" />
          </div>
          <div className="post-likes">8111 Likes</div>
          <div className="post-description">
            <strong>Author Name</strong>
            <p>Description</p>
          </div>
          <div className="post-comments">post comments</div>
          <div className="post-add-comment">
            <input type="text" placeholder="Add a Comment..." />
            <button>Post</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
