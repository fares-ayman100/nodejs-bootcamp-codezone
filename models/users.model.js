const mongoose = require("mongoose");
const validator = require("validator");
const userRole = require("../utils/userRoles");
const usersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Email Is Required"],
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  role: {
    type: String,
    enum: [userRole.ADMIN, userRole.USER, userRole.MANAGMENT],
    default: userRole.USER,
  },
});
module.exports = mongoose.model("User", usersSchema);
