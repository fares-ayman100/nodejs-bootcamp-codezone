const { validationResult } = require("express-validator");
const Course = require("../models/course.model");
const httpStatus = require("../utils/http_Server_State");
const asyncWrapper = require("../middleware/asyncWrapper");
const appError = require("../utils/appError");
const getAllCourses = asyncWrapper(async (req, res, next) => {
  const query = req.query;
  const limit = query.limit || Course.countDocuments();
  const page = query.page || 1;
  const skip = (page - 1) * limit;

  const Courses = await Course.find({}, { __v: false }).limit(limit).skip(skip);
  res.json({
    status: httpStatus.SUCCESS,
    data: { Courses: Courses },
  });
});

const getCourse = asyncWrapper(async (req, res, next) => {
  const course = await Course.findById(req.params.courseid);

  if (!course) {
    const error = appError.create(httpStatus.FAILD, "Course Not Found", 404);
    return next(error);
  }

  return res.json({
    status: httpStatus.SUCCESS,
    data: { course },
  });
});

const addCourse = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = appError.create(httpStatus.FAILD, errors.array(), 400);

    return next(error);
  }
  const newCourse = new Course({ ...req.body });

  await newCourse.save();
  res
    .status(201)
    .json({ status: httpStatus.SUCCESS, data: { course: newCourse } });
});

const updateCourse = asyncWrapper(async (req, res, next) => {
  const updateCourse = await Course.updateOne(
    { _id: req.params.courseid },
    { $set: { ...req.body } }
  );

  return res.status(200).json({
    status: httpStatus.SUCCESS,
    data: { course: updateCourse },
  });
});

const deleteCourse = asyncWrapper(async (req, res) => {
  await Course.deleteOne({ _id: req.params.courseid });
  res.json({
    status: httpStatus.SUCCESS,
    data: null,
  });
});

module.exports = {
  getAllCourses,
  updateCourse,
  getCourse,
  deleteCourse,
  addCourse,
};
