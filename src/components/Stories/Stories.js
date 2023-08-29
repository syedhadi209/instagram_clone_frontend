import React, { useEffect, useState } from "react";
import "./Stories.css";
import { AiOutlinePlus } from "react-icons/ai";
import ReactModal from "react-modal";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import Carousal from "../Carousel/Carousel";
import { useSelector } from "react-redux";

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

const Stories = () => {
  const currentUser = useSelector((state) => state.userSlice.data);
  const [isModal, setIsModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [stories, setStories] = useState(null);
  const [isAddStory, setIsAddStory] = useState(true);
  const [openedStory, setOpenedStory] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const openModal = (story) => {
    console.log(story);
    if (story) {
      console.log("HERE1");
      setOpenedStory(story);
      setIsAddStory(false);
      setIsModal(true);
    } else {
      console.log("HERE2");
      setIsAddStory(true);
      setIsModal(true);
    }
  };

  const modalClose = () => {
    setIsModal(false);
  };

  const replaceObjectById = (objectId, newObject) => {
    setStories((prevData) =>
      prevData.map((item) => (item.id === objectId ? newObject : item))
    );
  };

  const addStory = async () => {
    const token = localStorage.getItem("token");
    setIsLoading(true);
    const url = "https://api.cloudinary.com/v1_1/djbu7u6rk/image/upload";
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "instagram_clone");
    formData.append("cloud_name", "djbu7u6rk");
    await axios.post(url, formData).then((res) => {
      // console.log(res.data.url);
      axios
        .post(
          "http://127.0.0.1:8000/stories/add-story/",
          { url: res.data.url },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          replaceObjectById(res.data.id, res.data);
          setIsLoading(false);
          modalClose();
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    });
  };

  async function fetchStories() {
    const token = localStorage.getItem("token");
    await axios
      .get("http://127.0.0.1:8000/stories/get-stories/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setStories(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function deleteStory(storyId) {
    axios
      .delete(`http://127.0.0.1:8000/stories/delete-story/${storyId}/`)
      .then((res) => {
        setStories((prevData) =>
          prevData.filter((item) => item.id !== storyId)
        );
        modalClose();
      });
  }

  useEffect(() => {
    fetchStories();
  }, []);
  return (
    <div className="stories-main">
      <ReactModal
        isOpen={isModal}
        onRequestClose={() => modalClose()}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {isAddStory ? (
          <div className="uploader">
            <label className="label" htmlFor="fileInput">
              <span>Choose a file</span>
              <input
                type="file"
                id="fileInput"
                className="input"
                accept=".jpg, .jpeg, .png"
                onChange={handleFileChange}
              />
            </label>
            <div className={`placeholder ${selectedFile ? "selected" : ""}`}>
              {selectedFile ? selectedFile.name : "No file selected"}
            </div>
            {selectedFile && (
              <button onClick={addStory}>
                {isLoading ? (
                  <RotatingLines width="15" strokeColor="white" />
                ) : (
                  "Add Story"
                )}
              </button>
            )}
          </div>
        ) : (
          <div className="users-story-box">
            {openedStory.user.id === currentUser.id && (
              <button
                className="delete-story-button"
                onClick={() => deleteStory(openedStory?.id)}
              >
                Delete
              </button>
            )}
            <Carousal items={openedStory?.urls} />
          </div>
        )}
      </ReactModal>
      <div className="story-circle" onClick={() => openModal(null)}>
        <AiOutlinePlus size={20} />
      </div>
      {stories?.map((story, index) => {
        return (
          <div className="story-block" key={index}>
            <div className="story-circle" onClick={() => openModal(story)}>
              <img src={story?.urls[0].url} alt="story" />
            </div>
            <p>{story.user.username}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Stories;
