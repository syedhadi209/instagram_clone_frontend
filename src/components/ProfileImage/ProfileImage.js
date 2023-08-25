import React from "react";

const ProfileImage = ({ src, size }) => {
  return (
    <div
      className="profile-image-main"
      style={{
        maxWidth: "30px",
        maxHeight: "30px",
        borderRadius: "50%",
        background: "grey",
        width: size,
        height: size,
      }}
    >
      {src && <img src={src} alt="profile-circle" style={{ width: "100%" }} />}
    </div>
  );
};

export default ProfileImage;
