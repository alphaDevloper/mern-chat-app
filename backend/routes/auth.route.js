import { Router } from "express";
import {
  signIn,
  signOut,
  signUp,
  updateProfile,
} from "../controllers/auth.controller.js";
import authorize from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post("/sign-up", signUp);
authRouter.post("/sign-in", signIn);
authRouter.post("/sign-out", signOut);
authRouter.put("/update-profile", authorize, updateProfile);
authRouter.get("/check", authorize, (req, res) =>
  res.status(200).json(req.user),
);

export default authRouter;
