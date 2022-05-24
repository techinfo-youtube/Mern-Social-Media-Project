import React from "react";

const PostImage = ({ url }) => {
  return (
    <div>
      {url && <img src={url} alt="post-image" height={300} className="m-1" />}
    </div>
  );
};

export default PostImage;
