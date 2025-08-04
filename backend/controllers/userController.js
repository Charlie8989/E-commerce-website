import userModel from "../models/UserModel.js";
import validator from "validator";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        message: "User Doesn't Exists",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        message: "Incorrect Password",
        success: false,
      });
    } else {
      const token = createToken(user._id);
      res.json({ success: true, message: "Login Success", token });
    }
  } catch (error) {
    console.log(error);
    res.json({
      message: error.message,
      success: false,
    });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //checking already exists or not
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User Already exists" });
    }

    // checkng password strngth and email validation
    if (!validator.isEmail(email)) {
      return res.json({
        message: "Please Provide Valid Email",
        success: false,
      });
    }
    if (password.length < 8) {
      return res.json({
        message: "Password Must Be of 8 Charcaters",
        success: false,
      });
    }

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASS
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1d", // optional but good practice
      });
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { loginUser, registerUser, adminLogin };
