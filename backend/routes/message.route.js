import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";
import {
  getAllContacts,
  getChatPartners,
  getMessagesByUserId,
  sendMessage,
} from "../controllers/message.controller.js";
const messageRoute = Router();

messageRoute.get("/contacts", authorize, getAllContacts);
messageRoute.get("/chats", getChatPartners);
messageRoute.get("/:id", authorize, getMessagesByUserId);
messageRoute.post("/send/:id", authorize, sendMessage);

export default messageRoute;
