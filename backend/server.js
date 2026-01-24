import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./database/db.js";
import authRouter from "./routes/auth.route.js";
import arcjetMiddleware from "./middleware/arcjet.middleware.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();

const port = process.env.PORT || 3000;
// console.log(process.env.PORT);

app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use(arcjetMiddleware);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello, World!" });
});

// we are making our app ready for deployment here
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(__dirname, "../frontend/dist/index.html");
  });
}
app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
  await connectDB();
});
