const appError = require("../utils/appError");
const http_State = require("../utils/http_Server_State");

module.exports = (...roles) => {
  //console.log("roles", roles);
  return (req, res, next) => {
    if (!roles.includes(req.currentUser.role)) {
      return next(
        appError.create(http_State.FAILD, "This Role Is Not Authorized", 401)
      );
    }
    next();
  };
};
