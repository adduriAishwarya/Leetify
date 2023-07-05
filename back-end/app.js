import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./routes/index.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
routes(app);

app.listen(8000, () => {
  console.log("Server started on port 8000!");
});

mongoose.connect("mongodb://127.0.0.1:27017/leetifydb");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("MongoDB connected successfully!"));

export default app;
