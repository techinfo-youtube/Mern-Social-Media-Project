import React, { useContext } from "react";
import moment from "moment";
import { useRouter } from "next/router";
import renderHTML from "react-render-html";
import PostImage from "./PostImage";
import { BsSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import { GoComment } from "react-icons/go";
import { FaComment, FaEdit, FaTrash } from "react-icons/fa";
import { UserContext } from "../../context";
const PostList = ({ posts, deleteHandler }) => {
  const defaultImage = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  const router = useRouter();
  const [state] = useContext(UserContext);
  return (
    <>
      {posts &&
        posts.map((post) => (
          <div key={post._id}>
            <div className="card mb-5">
              <div className="card-header">
                <div>
                  <img
                    src={defaultImage}
                    alt="userpic"
                    height={30}
                    width={30}
                  />
                  <span className="ms-2">{post.postedBy.name}</span>
                  <span className="ms-3">
                    {moment(post.createdAt).fromNow()}
                  </span>
                </div>
              </div>
              <div className="card-body">
                <div>{renderHTML(post.content)}</div>
                <PostImage url={post.image && post.image.url} />
              </div>
              <div className="card-footer">
                <div className="d-flex flex-row m-2">
                  <p>
                    <BsSuitHeart color="red" size={25} /> 3 Likes
                  </p>
                  &nbsp; &nbsp;
                  <p>
                    <GoComment size={25} /> 5 Comment
                  </p>
                  {state && state.user && state.user._id === post.postedBy._id && (
                    <div className="ms-4">
                      <FaEdit
                        size={25}
                        style={{ cursor: "pointer" }}
                        onClick={() => router.push(`/user/post/${post._id}`)}
                      />{" "}
                      &nbsp; &nbsp;
                      <FaTrash
                        color="red"
                        size={25}
                        style={{ cursor: "pointer" }}
                        onClick={() => deleteHandler(post)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default PostList;
