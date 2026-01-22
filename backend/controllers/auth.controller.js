import mongoose from "mongoose";
import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = () => {};
export const signOut = () => {};
