const mongoose = require("mongoose");
const schemaCourses = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("Course", schemaCourses);
