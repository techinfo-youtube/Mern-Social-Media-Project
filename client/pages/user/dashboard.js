import React, { useState, useContext } from "react";
import { UserContext } from "../../context";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "./../../components/Layout/index";
import UserRoute from "../../components/routes/UserRoute";
import CreatePost from "../../components/Post/CreatePost";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const dashboard = () => {
  const [content, setContent] = useState("");
  const [state] = useContext(UserContext);
  const router = useRouter();
  //post handler
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/createpost", { content });
      // console.log("content", data);
      toast.success("Post Created!");
      setContent("");
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };
  return (
    <Layout>
      <UserRoute>
        <div className="row">
          <div className="col-md-8">
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <CreatePost
              content={content}
              setContent={setContent}
              handlePostSubmit={handlePostSubmit}
            />
          </div>
          <div className="col-md-4">sidebar</div>
        </div>
      </UserRoute>
    </Layout>
  );
};

export default dashboard;
