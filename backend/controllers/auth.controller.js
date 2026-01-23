import mongoose from "mongoose";
import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendWelcomeEmail } from "../email/emailHandler.js";
import dotenv from "dotenv";

dotenv.config();

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    // hash passwords -> securing passwords before saving it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUsers = await User.create(
      [{ name, email, password: hashedPassword }],
      { session },
    );
    const token = jwt.sign(
      { userId: newUsers[0]._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    await session.commitTransaction();
    session.endSession();
    res.status(201).json({
      success: true,
      message: "User registered successsfully",
      data: {
        token,
        user: newUsers[0],
      },
    });

    try {
      await sendWelcomeEmail(email, name, process.env.CLIENT_URL);
    } catch (error) {
      console.log("Error sending welcome email:", error.message);
    }
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = async () => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found");
    }

    const isPasswordValid = bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log("Password isn't valid");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    console.log("Failed to sign in user:", error.message);
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    // Since you're using JWT tokens, sign out is typically handled client-side
    // by removing the token from storage. However, you can still send a success response.

    res.status(200).json({
      success: true,
      message: "User signed out successfully",
    });
  } catch (error) {
    console.log("Failed to sign out user:", error.message);
    next(error);
  }
};
