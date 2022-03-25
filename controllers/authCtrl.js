import userModel from "../models/userModel";
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
  const user = new userModel({ name, email, password: hashedPassword, answer });
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
