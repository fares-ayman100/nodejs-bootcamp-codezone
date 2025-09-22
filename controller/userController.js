const bcrypt = require("bcrypt");
const asyncWrapper = require("../middleware/asyncWrapper");
const User = require("../models/users.model");
const httpStatus = require("../utils/http_Server_State");
const appError = require("../utils/appError");
const generateJWT = require("../utils/generate_access_token");
const getAllUsers = asyncWrapper(async (req, res) => {
  const query = req.query;
  const limit = query.limit || User.countDocuments();
  const page = query.page || 1;
  const skip = (page - 1) * limit;

  const Usres = await User.find({}, { __v: false, password: false })
    .limit(limit)
    .skip(skip);
  res.json({
    status: httpStatus.SUCCESS,
    data: { Users: Usres },
  });
});
const register = asyncWrapper(async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;
  const oldUser = await User.findOne({ email: email });
  const bcryptPassword = await bcrypt.hash(password, 6);

  if (oldUser) {
    const error = appError.create(
      httpStatus.FAILD,
      "Email Is Already EXist",
      400
    );
    return next(error);
  }
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: bcryptPassword,
    role: role,
    avatar: req.file ? req.file.filename : null,
  });

  const token = await generateJWT({
    email: newUser.email,
    id: newUser._id,
    role: newUser.role,
  });
  newUser.token = token;
  await newUser.save();
  res.status(201).json({
    status: httpStatus.SUCCESS,
    data: { user: newUser },
  });
});
const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const error = appError.create(
      httpStatus.FAILD,
      "Email and Pasword Is Required",
      400
    );
    return next(error);
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    const error = appError.create(httpStatus.FAILD, "Email Is Not EXist", 400);
    return next(error);
  }
  const matchedPassword = await bcrypt.compare(password, user.password);

  if (user && matchedPassword) {
    const token = await generateJWT({
      email: user.email,
      id: user._id,
      role: user.role,
    });
    return res
      .json({
        status: httpStatus.SUCCESS,
        message: "Logged in Successful",
        data: { token },
      })
      .status(200);
  } else {
    return res
      .status(400)
      .json({ status: httpStatus.FAILD, message: "Password Is incorrect" });
  }
});
module.exports = {
  getAllUsers,
  login,
  register,
};
