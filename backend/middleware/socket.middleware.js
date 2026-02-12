import User from "../models/User.model.js";
import jwt from "jsonwebtoken";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];

    if (!token) {
      console.log("Socket connection rejected. No token provided");
      return next(new Error("Unauthorized - no socket token provided"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      console.log("Socket connection rejected - Invalid token");
      return next(new Error("Invalid socket token"));
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      console.log("Socket User not found");
      return next(new Error("User not found"));
    }

    socket.user = user;
    socket.userId = user._id.toString();

    console.log(
      `Socket authentication for user: ${user.fullName} (${user._id})`,
    );
    next();
  } catch (error) {
    console.error("Error in socket authentication", error.message);
    next(new Error("Socket Unauthorized"));
  }
};
