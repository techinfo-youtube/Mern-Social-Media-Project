import React from "react";
import moment from "moment";
import renderHTML from "react-render-html";
const PostList = ({ posts }) => {
  const defaultImage = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
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
              </div>
              <div className="card-footer">
                <div>
                  {post.image ? (
                    <img
                      src={post.image && post.image.url}
                      alt={post.postedBy.name}
                      height={300}
                    />
                  ) : (
                    ""
                  )}
                </div>
                <p>Like Comment</p>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default PostList;
