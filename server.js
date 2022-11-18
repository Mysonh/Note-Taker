const express = require('express');
const savedNote = require('./develop/db/db.json');
const fs = require('fs');
const app = express();
const uuid = require('uuid');
const path = require('path');

const PORT = process.env.PORT || 5500;


//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('./develop/public'));

// API routes || GET request
app.get('/api/notes', function (req, res) {
  res.sendFile(path.join(__dirname, './develop/db/db.json'))
});

// Post request
app.post('/api/notes', function (req, res) {
    const  newNote = req.body;
    const savedNote = JSON.parse(fs.readFileSync('./develop/db/db.json'));
    newNote.id = uuid.v4(),
    savedNote.push(newNote);
    fs.writeFileSync('./develop/db/db.json',JSON.stringify(savedNote))
    res.json(savedNote);
});

//HTML Routes
app.get('/notes',function (req,res) {
res.sendFile(path.join(__dirname, './develop/pubic/notes.html'))
});
app.get('/', function (req,res) {
res.sendFile(path.join(__dirname, './develop/pubic/index.html'))
});
app.get('*', function (req,res) {
res.sendFile(path.join(__dirname, './develop/pubic/index.html'))
});


app.listen(5500, function () {
  console.log(`App listening at http://localhost:${PORT} 🚀`)
});