
const express = require('express');
const app = express();
const path = require('path');

const cors = require('cors')
const mongoose = require('./config/db');


let port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.set('port', (port || 5000));

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("MongoDB connected!")
});

// // Static file declaration
app.use(express.static(path.join(__dirname, 'FrontEnd/build')));

app.use('/', require('./Routes/index'))

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/FrontEnd/build/index.html'));
});


app.listen(app.get('port'), () => {
  console.log('Server is running on port : ' + app.get('port'));
})