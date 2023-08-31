import React, { useEffect, useState } from "react";
import "./CommentBox.css";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import ProfileImage from "../ProfileImage/ProfileImage";
import axios from "axios";
import { useSelector } from "react-redux";

const CommentBox = ({ commentData, deleteComment, setComment, isOwner }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [updatedContent, setUpdatedContent] = useState("");
  const currentUser = useSelector((state) => state.userSlice.data);
  const updateComment = async () => {
    await axios
      .put(`http://127.0.0.1:8000/comment/update-comment/${commentData.id}/`, {
        updatedContent: updatedContent,
      })
      .then((res) => {
        console.log(res.data);
        commentData.content = updatedContent;
        setIsEdit(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    setUpdatedContent(commentData.content);
  }, [commentData.content]);
  return (
    <div className="comment-box">
      <div className="comment-user">
        <div className="comment-username">
          <Link to={`/profile/${commentData.user.username}`}>
            <ProfileImage size={30} src={commentData.user.profile_picture} />
            <p>{commentData.user.username}</p>
          </Link>
        </div>
        <div className="comment-content">
          {isEdit ? (
            <>
              <input
                type="text"
                value={updatedContent}
                onChange={(e) => setUpdatedContent(e.target.value)}
              />
              <button onClick={updateComment}>Update</button>
            </>
          ) : (
            <p>{commentData.content}</p>
          )}
        </div>
      </div>
      {(isOwner || commentData.user.id === currentUser.id) && (
        <div className="comment-actions">
          <BiEdit
            size={20}
            style={{ cursor: "pointer" }}
            onClick={() => setIsEdit(!isEdit)}
          />
          <AiFillDelete
            size={20}
            style={{ cursor: "pointer" }}
            onClick={() => deleteComment(commentData.id)}
          />
        </div>
      )}
    </div>
  );
};

export default CommentBox;
