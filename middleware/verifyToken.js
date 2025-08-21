const httpStatus = require("../utils/http_Server_State");
const appError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const authHeaders =
    req.headers["Authorization"] || req.headers["authorization"];
  if (!authHeaders) {
    const error = appError.create(httpStatus.FAILD, "Token Is Required", 401);
    return next(error);
  }
  const token = authHeaders.split(" ")[1];
  try {
    const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.currentUser = currentUser;
    //console.log("Current User", currentUser);
    next();
  } catch (err) {
    const error = appError.create(httpStatus.FAILD, "Invalid Token", 401);
    return next(error);
  }
};
module.exports = verifyToken;
