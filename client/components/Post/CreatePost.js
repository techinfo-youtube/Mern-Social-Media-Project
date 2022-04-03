import React from "react";
import dynamic from "next/dynamic";
import { BsCamera } from "react-icons/bs";
//ssr false
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
const CreatePost = ({
  content,
  setContent,
  handlePostSubmit,
  handleImage,
  image,
  uploading,
}) => {
  return (
    <>
      <div className="card mt-4">
        <ReactQuill
          className="form-control"
          value={content}
          onChange={(e) => setContent(e)}
          placeholder="Leave a comment here"
          id="floatingTextarea"
        />
        <div className="d-flex justify-content-between">
          <label htmlFor="image" className="ms-4 mt-2">
            {image && image.url ? (
              <img src={image.url} height={30} width={30} className="m-2" />
            ) : uploading ? (
              <>
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </>
            ) : (
              <BsCamera size={40} style={{ cursor: "pointer" }} />
            )}

            <input
              type="file"
              accept="images/*"
              onChange={handleImage}
              name="image"
              id="image"
              hidden
            />
          </label>
          <button
            disabled={!content}
            onClick={handlePostSubmit}
            className="btn btn-primary m-2"
            style={{ width: "150px" }}
          >
            Post
          </button>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
