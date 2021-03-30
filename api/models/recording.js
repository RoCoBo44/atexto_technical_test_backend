const mongoose = require("mongoose")

const recordingSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  audio: Buffer,
  size: Number
})

module.exports = mongoose.model('Recording', recordingSchema)
