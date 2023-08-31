import React, { useEffect, useState } from "react";
import "./Post.css";
import ProfileImage from "../ProfileImage/ProfileImage";
import { SlOptions } from "react-icons/sl";
import Carousel from "../Carousel/Carousel";
import { AiFillHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { useSelector } from "react-redux";
import ReactModal from "react-modal";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router";
import CommentBox from "../CommentBox/CommentBox";
import { Link } from "react-router-dom";

const customStyles = {
  overlay: {
    zIndex: "1000",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "500px",
    width: "100%",
    backgroundColor: "#262626",
    borderRadius: "20px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
    margin: "auto",
    overflow: "hidden !important",
    maxHeight: "600px",
    height: "600px",
  },
};

const Post = ({ postData, removePost }) => {
  // console.log(postData);
  axios.defaults.baseURL = "http://127.0.0.1:8000/";
  const navigate = useNavigate();
  const [toggleBox, setToggleBox] = useState(false);
  const currentUser = useSelector((state) => state.userSlice.data);
  const canEditOrDelete = currentUser.id === postData?.user.id;
  const [isModal, setIsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [updatedCaption, setUpdatedCaption] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [commentToggle, setCommentToggle] = useState(false);
  const [data, setData] = useState(postData);

  const deletePost = (postId) => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    axios
      .delete(`http://127.0.0.1:8000/posts/delete-post/${postId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.response);
        removePost(res.data.response);
        modalClose();
        setIsLoading(false);
      })
      .catch((err) => {
        navigate("/");
      });
  };

  const openModal = (action) => {
    if (!action) {
      customStyles.content.maxWidth = "500px";
      setIsDelete(true);
    } else {
      customStyles.content.width = "80%";
      customStyles.content.maxWidth = "1000px";
      setIsDelete(false);
    }
    setToggleBox(false);
    setIsModal(true);
  };

  const modalClose = () => {
    setIsModal(false);
  };

  function likePost(postId) {
    const token = localStorage.getItem("token");
    axios
      .post(
        `http://127.0.0.1:8000/like/like-post/${postId}/${currentUser.id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (!res.data.response) {
          setIsLiked(false);
          const userToRemove = currentUser.id;
          postData.likes = postData?.likes?.filter(
            (obj) => obj.user !== userToRemove
          );
        } else {
          setIsLiked(true);
          postData.likes.push({ user: currentUser.id });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const updatePost = (postId) => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    const data = {
      caption: updatedCaption,
    };
    axios
      .put(`http://127.0.0.1:8000/posts/update-post/${postId}/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        console.log("update", res.data);
        postData.description = updatedCaption;
        modalClose();
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
      });
  };

  const addComment = async () => {
    const token = localStorage.getItem("token");
    await axios
      .post(
        `http://127.0.0.1:8000/comment/add-comment/${postData.id}/`,
        { content: comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setData((prevData) => ({
          ...prevData,
          comments: [res.data.response, ...prevData.comments],
        }));
        setComment("");
      })
      .catch((err) => {
        console.log(err);
        navigate("/dashboard");
      });
  };

  const deleteComment = async (commentId) => {
    await axios
      .delete(`http://127.0.0.1:8000/comment/delete-comment/${commentId}/`)
      .then((res) => {
        setData((prev) => ({
          ...prev,
          comments: prev.comments.filter((comment) => comment.id !== commentId),
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    let flag = false;
    postData?.likes?.map((like) => {
      if (like?.user === currentUser.id) {
        flag = true;
      }
    });
    setIsLiked(flag);
  }, [isLiked, postData.comments, removePost]);
  return (
    <>
      <ReactModal
        isOpen={isModal}
        onRequestClose={() => modalClose()}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modal-body">
          {isDelete ? (
            <>
              <div className="modal-heading">
                <p style={{ color: "red" }}>Confirm Delete Post</p>
              </div>
              <div className="modal-input-delete">
                <p>Do you want to Delete this Post ?</p>
                <div className="modal-buttons-delete">
                  <button onClick={modalClose}>Cancel</button>
                  <button onClick={() => deletePost(postData.id)}>
                    {isLoading ? (
                      <RotatingLines width="15" strokeColor="white" />
                    ) : (
                      "Delete"
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="modal-heading">
                <p>Edit Post</p>
              </div>
              <div className="modal-input-edit">
                <div className="post-urls-box">
                  <Carousel items={postData.attachements} edit={true} />
                </div>
                <div className="post-caption-box">
                  <textarea
                    placeholder="Edit Caption"
                    onChange={(e) => setUpdatedCaption(e.target.value)}
                    defaultValue={postData?.description}
                  ></textarea>
                  <div className="edit-button-box">
                    <button onClick={modalClose}>Cancel</button>
                    <button onClick={() => updatePost(postData?.id)}>
                      {isLoading ? (
                        <RotatingLines width="15" strokeColor="white" />
                      ) : (
                        "Edit"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </ReactModal>
      <div className="main-posts-area">
        <div className="main-post-body">
          <div className="post-header">
            <Link to={`/profile/${postData?.user.username}`}>
              <div className="post-author">
                <ProfileImage src={postData?.user.profile_picture} size={30} />
                <p
                  style={{
                    textTransform: "capitalize",
                    fontFamily: "Poppins",
                    fontWeight: "700",
                  }}
                >
                  {postData?.user.username}
                </p>
              </div>
            </Link>
            <button>
              {canEditOrDelete && (
                <SlOptions
                  size={25}
                  color="white"
                  onClick={() => setToggleBox(!toggleBox)}
                />
              )}
              {toggleBox && (
                <div className="toggle-box">
                  <button onClick={() => openModal(0)}>Delete</button>
                  <button onClick={() => openModal(1)}>Edit</button>
                </div>
              )}
            </button>
          </div>
          <div className="post-attachements">
            <Carousel items={postData?.attachements} edit={false} />
          </div>
          <div className="post-actions">
            <AiFillHeart
              size={25}
              cursor={"pointer"}
              title="Like Post"
              onClick={() => likePost(postData?.id)}
              color={isLiked ? "red" : ""}
            />
            <FaRegComment
              size={25}
              cursor={"pointer"}
              title="Comment"
              onClick={() => setCommentToggle(!commentToggle)}
            />
          </div>
          <div className="post-likes">{postData?.likes?.length} Likes</div>
          <div className="post-description">
            <strong style={{ fontWeight: "bold", textTransform: "capitalize" }}>
              {postData?.user.username}
            </strong>
            <p style={{ fontWeight: "300" }}>{postData?.description}</p>
          </div>
          <div
            className="post-comments"
            onClick={() => setCommentToggle(!commentToggle)}
          >
            View all comments
          </div>
          {commentToggle && (
            <div className="comments-main">
              {data.comments.length > 0
                ? data.comments.map((comment, index) => {
                    return (
                      <CommentBox
                        commentData={comment}
                        deleteComment={deleteComment}
                        setComment={setComment}
                        key={index}
                        isOwner={postData.user.id === currentUser.id}
                      />
                    );
                  })
                : "No comments"}
            </div>
          )}
          <div className="post-add-comment">
            <input
              type="text"
              placeholder="Add a Comment..."
              onChange={(e) => setComment(e.target.value)}
              defaultValue={comment}
            />
            <button disabled={comment?.length === 0} onClick={addComment}>
              Post
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
