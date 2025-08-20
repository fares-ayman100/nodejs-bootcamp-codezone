const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const verifyToken = require("../middleware/verifyToken");
router.route("/").get(verifyToken, userController.getAllUsers);

router.route("/register").post(userController.register);
router.route("/login").post(userController.login);

module.exports = router;
