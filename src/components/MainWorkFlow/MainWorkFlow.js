import React, { useCallback, useEffect, useState } from "react";
import "./MainWorkFlow.css";
import Stories from "../Stories/Stories";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import ReactModal from "react-modal";
import { closeModal } from "../../store/slices/ModalSlice";
import { RxCross2 } from "react-icons/rx";
import file_upload from "../../assets/images/file_upload.png";
import axios from "axios";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";

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
  const dispatch = useDispatch();
  const [files, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState(null);
  const [isValidFormat, setIsValidFormat] = useState(true);
  const validFormats = ["jpg", "jpeg", "png"];

  function checkFormat(file) {
    return validFormats.includes(file["name"].split(".")[1].toLowerCase());
  }

  const handleChange = async () => {
    for (let i = 0; i < files.length; i++) {
      let isValid = checkFormat(files[i]);
      console.log(isValid);
      if (!isValid) {
        setIsValidFormat(false);
      }
    }
    if (isValidFormat) {
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
          .then((data) => JSON.parse(data).url)
          .catch((err) => {
            console.log(err.message);
            toast.error(err.message, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          });

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
              setPosts((pre) => [res.data.data, ...pre]);
              setIsLoading(false);
              dispatch(closeModal());
              setFile(null);
              toast.success("Post created Successfully", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            })
            .catch((err) => {
              console.log(err);
              if (err.code === 401) {
                navigate("/dashboard");
              }
              setFile(null);
              toast.error(err.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            });
        })
        .catch((error) => {
          console.error("Error uploading files:", error);
          if (error.code === 401) {
            navigate("/dashboard");
          }
          toast.error(error.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });
    } else {
      toast.warn("Only JPG, JPEG, PNG Formats are allowed", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
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
        setPosts(res.data);
      })
      .catch((err) => {
        navigate("/");
      });
  }

  const removePost = useCallback((postId) => {
    const restPost = posts.filter((post) => {
      console.log(typeof post.id, typeof postId);
      // eslint-disable-next-line
      return post.id != postId;
    });
    setPosts(restPost);
  });
  // eslint-disable-next-line
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="main-work-flow-container">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
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
                    <div className="file-uploader" style={{ display: "flex" }}>
                      <img src={file_upload} alt="dummy" />
                      <label className="custom-file-input">
                        <span>Choose Files</span>
                        <input
                          type="file"
                          name="files[]"
                          multiple
                          accept=".jpg, .jpeg, .png"
                          onChange={(e) => setFile(e.target.files)}
                        />
                      </label>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="caption-box">
                  <label>Add Caption</label>
                  <textarea
                    placeholder="Add a Caption"
                    onChange={(e) => setCaption(e.target.value)}
                  ></textarea>
                  <button
                    onClick={handleChange}
                    disabled={caption.length === 0}
                  >
                    {isLoading ? (
                      <RotatingLines width="15" strokeColor="black" />
                    ) : (
                      "Share"
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </ReactModal>
        <Stories />
        {posts?.length > 0 ? (
          posts?.map((post, index) => {
            return (
              <Post postData={post} key={post?.id} removePost={removePost} />
            );
          })
        ) : (
          <h2>No posts to show</h2>
        )}
      </div>
    </div>
  );
};

export default MainWorkFlow;
