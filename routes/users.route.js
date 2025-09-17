const express = require("express");
const multer = require("multer");
const httpStatus = require("../utils/http_Server_State");
const userController = require("../controller/userController");
const router = express.Router();
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("file======", file);
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    console.log(file);
    const ext = file.mimetype.split("/")[1];
    const filName = `user-${Date.now()}.${ext}`;
    cb(null, filName);
  },
});
const filFilter = (req, file, cb) => {
  const imageType = file.mimetype.split("/")[0];
  if (imageType == "image") {
    return cb(null, true);
  } else {
    return cb(
      appError.create(httpStatus.FAILD, "File Is not An Image", 400),
      false
    );
  }
};
const upload = multer({ storage: diskStorage, fileFilter: filFilter });
const verifyToken = require("../middleware/verifyToken");
const appError = require("../utils/appError");
router.route("/").get(verifyToken, userController.getAllUsers);

router
  .route("/register")
  .post(upload.single("avatar"), userController.register);
router.route("/login").post(userController.login);

module.exports = router;
