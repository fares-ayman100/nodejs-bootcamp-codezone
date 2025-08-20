let controller = require("../controller/coursesController");
const express = require("express");
const router = express.Router();
const { validationSchema } = require("../middleware/validationSchema");
router
  .route("")
  .get(controller.getAllCourses)
  .post(validationSchema(), controller.addCourse);

router
  .route("/:courseid")
  .get(controller.getCourse)
  .patch(controller.updateCourse)
  .delete(controller.deleteCourse);
module.exports = router;
