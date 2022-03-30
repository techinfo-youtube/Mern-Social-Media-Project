import React from "react";
import dynamic from "next/dynamic";
//ssr false
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
const CreatePost = ({ content, setContent, handlePostSubmit }) => {
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

        <button
          disabled={!content}
          onClick={handlePostSubmit}
          className="btn btn-primary m-2"
        >
          Post
        </button>
      </div>
    </>
  );
};

export default CreatePost;
