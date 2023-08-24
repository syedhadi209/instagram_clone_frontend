import React, { useEffect, useState } from "react";
import "./MainWorkFlow.css";
import Stories from "../Stories/Stories";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import ReactModal from "react-modal";
import { closeModal } from "../../store/slices/ModalSlice";
import { RxCross2 } from "react-icons/rx";
import file_upload from "../../assets/images/file_upload.png";
import Spinner from "../Spinner/Spinner";
import axios from "axios";
import { useNavigate } from "react-router";
import ProfileImage from "../ProfileImage/ProfileImage";

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
    maxWidth: "700px",
    width: "100%",
    backgroundColor: "#262626",
    borderRadius: "20px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
    overflow: "auto",
    margin: "auto",
    transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out", // Adjust the animation properties
  },
};

const MainWorkFlow = () => {
  ReactModal.setAppElement("#root");
  const navigate = useNavigate();
  const isModal = useSelector((state) => state.modalSlice.isModalOpen);
  const user = useSelector((state) => state.userSlice.data);
  const dispatch = useDispatch();
  const [files, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState(null);

  const handleChange = async () => {
    setIsLoading(true);
    const url = "https://api.cloudinary.com/v1_1/djbu7u6rk/image/upload";
    const uploadPromises = []; // Array to hold upload promises

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "instagram_clone");
      formData.append("cloud_name", "djbu7u6rk");

      const uploadPromise = fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.text())
        .then((data) => JSON.parse(data).url);

      uploadPromises.push(uploadPromise);
    }

    Promise.all(uploadPromises)
      .then((responses) => {
        const data = {
          caption: caption,
          responses: responses,
        };

        const accessToken = localStorage.getItem("token");
        axios
          .post("http://127.0.0.1:8000/posts/create-post/", data, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => {
            const attachements = [];
            responses.forEach((url) => {
              attachements.push({ url: url });
            });
            const newPost = {
              attachements: attachements,
              description: caption,
              user: user,
              id: res.data.data?.id,
            };
            console.log("posts", newPost, res);
            setPosts((pre) => [...pre, newPost]);
            setIsLoading(false);
            dispatch(closeModal());
            setFile(null);
          });
      })
      .catch((error) => {
        console.error("Error uploading files:", error);
      });
  };

  function modalClose() {
    dispatch(closeModal());
    setFile(null);
  }

  async function fetchPosts() {
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/posts/get-posts/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch((err) => {
        navigate("/");
      });
  }

  const removePost = (postId) => {
    console.log("post id", postId, posts);
    const restPost = posts.filter((post) => {
      return post.id != postId;
    });
    setPosts(restPost);
    console.log("Posts after ", restPost);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="main-work-flow-container">
      <div className="post-stories-container">
        <ReactModal
          isOpen={isModal}
          onRequestClose={() => modalClose()}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="modal-body">
            <div className="modal-heading">
              <p>Create New Post</p>
              <button onClick={() => modalClose()}>
                <RxCross2 size={25} color="white" />
              </button>
            </div>
            <div className="modal-input">
              {!files ? (
                <div className="modal-app">
                  <form method="post" encType="multipart/form-data">
                    <div className="file-uploader">
                      <img src={file_upload} alt="dummy" />
                      <label className="custom-file-input">
                        <span>Choose Files</span>
                        <input
                          type="file"
                          name="files[]"
                          multiple
                          onChange={(e) => setFile(e.target.files)}
                        />
                      </label>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="caption-box">
                  {isLoading && (
                    <div style={{ textAlign: "center" }}>
                      <Spinner />
                    </div>
                  )}
                  <label>Add Caption</label>
                  <textarea
                    placeholder="Add a Caption"
                    onChange={(e) => setCaption(e.target.value)}
                  ></textarea>
                  <button
                    onClick={handleChange}
                    disabled={caption.length === 0}
                  >
                    Share
                  </button>
                </div>
              )}
            </div>
          </div>
        </ReactModal>
        <Stories />
        {posts?.map((post, index) => {
          return (
            <Post postData={post} key={post?.id} removePost={removePost} />
          );
        })}
      </div>
    </div>
  );
};

export default MainWorkFlow;
