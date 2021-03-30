const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const multer = require('multer')
const recordingRoutes = require('./api/routes/recordings')
const mongoose = require('mongoose')

const upload = multer()
const app = express()
const port = 3001

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true})




//MIDDLEWARES
//use cors to allow cross origin resource sharing
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

// for parsing application/json
app.use(express.json())

// for parsing application/xwww-form-urlencoded
app.use(express.urlencoded({
  extended: false
}));

// for parsing multipart/form-data
app.use(upload.array())
app.use(express.static('public'))

app.use(logger('dev'))

//ROUTES
app.use('/recordings', recordingRoutes)

app.get('/', function (req, res) {
  res.send('hello world')
})


//errors
app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status(404)
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})





app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
