let controller = require("../controller/coursesController");
const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const allowedTo=require("../middleware/allowedTo")
const userRole = require("../utils/userRoles");

const router = express.Router();
const { validationSchema } = require("../middleware/validationSchema");
router
  .route("")
  .get(controller.getAllCourses)
  .post(verifyToken, validationSchema(), controller.addCourse);

router
  .route("/:courseid")
  .get(controller.getCourse)
  .patch(controller.updateCourse)
  .delete(
    verifyToken,
    allowedTo(userRole.ADMIN, userRole.MANAGMENT),
    controller.deleteCourse
  );
module.exports = router;
