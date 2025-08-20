const express = require("express");
const morgan = require("morgan");
const httpStatus = require("./utils/http_Server_State");
const courseRouter = require("./routes/courses.route");
const userRouter = require("./routes/users.route");
const cors = require("cors");

require("dotenv").config();
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@learnmongodb.9r8z0ga.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=LearnMongoDB`;
const mongoose = require("mongoose");
mongoose.connect(url).then(() => {
  console.log("Connection Successful");
});
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/courses", courseRouter);
app.use("/api/users", userRouter);

app.use((req, res, next) => {
  const err = new Error("Route does not exist");
  err.statusCode = 404;
  next(err);
});

app.use((error, req, res, next) => {
  return res.status(error.statusCode || 500).json({
    status: error.statusText || httpStatus.ERROR,
    message: error.message,
    code: error.statusCode || 500,
    data: null,
  });
});
app.listen(process.env.PORT, () => {
  console.log("Lisitning On Port 3000");
});
