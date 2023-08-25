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

const customStyles = {
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
    zIndex: "1000",
  },
};

const MainWorkFlow = () => {
  ReactModal.setAppElement("#root");
  const isModal = useSelector((state) => state.modalSlice.isModalOpen);
  const dispatch = useDispatch();
  const [files, setFile] = useState(null);
  const [responses, setResponses] = useState([]);
  const [caption, setCaption] = useState("");
  const [responsesRecieved, setResonsesRecieved] = useState(false);

  const handleChange = async () => {
    const url = "https://api.cloudinary.com/v1_1/djbu7u6rk/image/upload";
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      formData.append("file", file);
      formData.append("upload_preset", "instagram_clone");
      formData.append("cloud_name", "djbu7u6rk");

      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          return response.text();
        })
        .then((data) => {
          setResponses([...responses, JSON.parse(data).url]);
          if (files.length === responses.length) {
            console.log("here");
            setResonsesRecieved(true);
          }
        });
    }
  };

  function modalClose() {
    dispatch(closeModal());
    setFile(null);
  }

  useEffect(() => {
    console.log(responsesRecieved);
  }, [responsesRecieved]);

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
                <div className="App">
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
                  <div style={{ textAlign: "center" }}>
                    <Spinner />
                  </div>
                  <label>Add Caption</label>
                  <textarea
                    placeholder="Add a Caption"
                    onChange={(e) => setCaption(e.target.value)}
                  ></textarea>
                  <button onClick={handleChange}>Share</button>
                </div>
              )}
            </div>
          </div>
        </ReactModal>
        <Stories />
        <Post />
      </div>
      <div className="main-suggestion-area">Post suggestion area</div>
    </div>
  );
};

export default MainWorkFlow;
