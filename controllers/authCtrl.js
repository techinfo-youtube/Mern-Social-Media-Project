import userModel from "../models/userModel";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import { hashPassword, comaprePassword } from "../utils/helper";
export const registerController = async (req, res) => {
  const { name, email, password, answer } = req.body;

  //validation
  if (!name) {
    return res.status(400).send("Name Is Required");
  }
  if (!password) {
    return res.status(400).send("Password is required");
  }
  if (!answer) {
    return res.status(400).send("Answer is required");
  }
  const exist = await userModel.findOne({ email });
  if (exist) {
    return res.status(400).send("Email Already Taken");
  }
  //hash password
  const hashedPassword = await hashPassword(password);
  const user = new userModel({
    name,
    email,
    password: hashedPassword,
    answer,
    username: nanoid(6),
  });
  try {
    await user.save();
    res.status(201).send("User Register");
  } catch (error) {
    console.log("errro while registration", error);
    return res.status(400).send("Error , Try Again!");
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check user in db
    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).send("Invalid User");
    //check password
    const match = await comaprePassword(password, user.password);
    if (!match) return res.status(400).send("Invalid Password");
    //jwt token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    user.password = undefined;
    user.answer = undefined;
    res.status(200).json({
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error, Try Again");
  }
};
//protected route
export const currentUserController = async (req, res) => {
  console.log(req.user);
  try {
    const user = await userModel.findById(req.user._id);
    res.json({ ok: true });
    // res.json(user)
  } catch (error) {
    console.log(error);
  }
};

//forgot password
export const forgotPasswordController = async (req, res) => {
  const { email, answer, newPassword } = req.body;
  //validation
  if (!email) {
    res.status(400).send("Email Is Requires");
  }
  if (!newPassword) {
    res.status(400).send("New Password Required");
  }
  if (!answer) {
    res.status(400).send("Answer is Required");
  }
  const user = await userModel.findOne({ email, answer });
  if (!user) {
    res.status(404).sed("Wrong Email Or Answer,PLease Try Again");
  }
  try {
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    return res.status(201).send("Password Reset success");
  } catch (error) {
    console.log(error);
    return res.status(400).send("Somthing Went Wrong");
  }
};

// update profile
export const updateProfileController = async (req, res) => {
  // console.log(req.body);
  try {
    const data = {};
    if (req.body.username) {
      data.username = req.body.username;
    }
    if (req.body.image) {
      data.image = req.body.image;
    }
    if (req.body.about) {
      data.about = req.body.about;
    }
    if (req.body.name) {
      data.name = req.body.name;
    }
    if (req.body.password) {
      if (req.body.password < 6) {
        return res.status(502).json({
          error: "Password Required and should be longer than 6 character",
        });
      } else {
        data.password = await hashPassword(req.body.password);
      }
    }
    if (req.body.answer) {
      data.answer = req.body.answer;
    }
    let user = await userModel.findByIdAndUpdate(req.user._id, data, {
      new: true,
    });
    user.password = null;
    user.answer = null;
    res.status(200).json(user);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        error: "Duplicate UserName Error",
      });
    }
    console.log(err);
  }
};
