import expressJwt from "express-jwt";
import postModel from "../models/postModel";
export const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

//edit update delete
export const canEditDeletePost = async (req, res, next) => {
  try {
    const post = await postModel.findById(req.params._id);
    if (req.user._id != post.postedBy) {
      return res.status(402).send("unAuthorized ACcess");
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
