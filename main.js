const express = require("express");
const morgan = require("morgan");
const httpStatus = require("./utils/http_Server_State");
const courseRouter = require("./routes/courses.route");
const userRouter = require("./routes/users.route");
const cors = require("cors");
const path = require("node:path");

require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Connection Successful");
});
const app = express();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
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
app.listen(process.env.PORT || 3000, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${process.env.PORT || 3000}`);
});
