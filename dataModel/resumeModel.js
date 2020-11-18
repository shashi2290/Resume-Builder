const mongoose = require('mongoose');

const sectionSchema = mongoose.Schema({
  title: String,
  body: String,
});

const ResumeSchema = mongoose.Schema({
  fName: String,
  lName: String,
  age: String,
  currentProfile: String,
  email: String,
  phone: String,
  section: [sectionSchema],
});

module.exports = mongoose.model('Resume', ResumeSchema);
