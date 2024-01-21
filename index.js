const { connectDataBase } = require("./Config/database");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");

const app = express();

app.use(express.json());

app.use(express.json());
app.use(cors());

dotenv.config();
connectDataBase();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is Started on ${process.env.PORT} port`);
});
