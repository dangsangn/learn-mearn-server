const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();
const authRouter = require("./routers/author");
const postRouter = require("./routers/post");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.y6f0v.mongodb.net/mern-begin?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }
    );
    console.log("connect");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB();

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

app.get("/", (req, res) => {
  res.send("hello world!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("app is listen at " + PORT);
});
