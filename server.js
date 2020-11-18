const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const pdf = require('html-pdf');
const pdfTemplate = require('./documents/templatePdf');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//Import Routes
const resumeRoute = require('./routes/resume');
//Refer to routes folder for all /resume POST and DELETE sections
app.use('/resume', resumeRoute);

// Routes
app.get('/', (req, res) => {
  res.send(
    'Resume Builer - Go to /resume to view all resumes in the Database '
  );
});

//Post- PDF generation and fetching data
app.post('/create-pdf', (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
    if (err) res.send(Promise.reject());
    else res.send(Promise.resolve());
  });
});

//GET- Send the generated PDF to the client
app.get('/fetch-pdf', (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`);
});

//Connect to DB
mongoose.connect(
  'mongodb+srv://admin-shashi:shashi22@cluster0.edjrq.mongodb.net/resumeDB?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Connected to Atlas server');
  }
);

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
