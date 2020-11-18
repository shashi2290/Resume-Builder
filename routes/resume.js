const express = require('express');
const router = express.Router();

//Importing mongoose Schema for Resume from dataModel folder
const Resume = require('../dataModel/resumeModel');

//Get all resumes that are posted
router.get('/', async (req, res) => {
  try {
    const resumes = await Resume.find();
    res.json(resumes);
  } catch (err) {
    res.json({ message: err });
  }
});

//Submit a resume
router.post('/', async (req, res) => {
  const resume = new Resume({
    fName: req.body.fName,
    lName: req.body.lName,
    age: req.body.age,
    currentProfile: req.body.currentProfile,
    email: req.body.email,
    phone: req.body.phone,
    section: req.body.section,
  });

  try {
    const savedResume = await resume.save();
    res.json(savedResume);
  } catch (err) {
    res.json({ message: err });
  }
});

//Get specific resume by email
router.get('/:email', async (req, res) => {
  try {
    const resume = await Resume.find({ email: req.params.email });
    res.json(resume);
  } catch (err) {
    res.json({ message: err });
  }
});

//Delete a resume by email
router.delete('/:email', async (req, res) => {
  try {
    const deletedResume = await Resume.remove({ email: req.params.email });
    res.json(deletedResume);
  } catch (err) {
    res.json({ message: err });
  }
});

//Update a document
router.put('/:email', async (req, res) => {
  try {
    const updatedResume = await Resume.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      function (err, resp) {}
    );
    res.json(updatedResume);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
