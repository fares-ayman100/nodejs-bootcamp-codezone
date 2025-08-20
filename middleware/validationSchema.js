const { body } = require("express-validator");

const validationSchema = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("Title Must be Required")
      .isLength({ min: 2 })
      .withMessage("Title Lenght Must Atleast 2 Char"),
    body("price").notEmpty().withMessage("Price Is Required"),
  ];
};
module.exports = { validationSchema };
