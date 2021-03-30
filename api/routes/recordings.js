const express = require('express')
const router = express.Router()

const Recording = require('../models/recording')
const mongoose = require('mongoose')

router.get('/', (req, res) => {
  Recording.find({}, '_id title')
    .then(docs => {
      res.status(200).json(docs)
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
})

router.post('/', (req, res) => {
  const recording = new Recording({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    audio: Buffer.from(req.body.audio,'base64'),
    size: req.body.audioSize
  })
  recording
    .save()
    .then( result => {
      res.status(200).json({
        message: 'recording saved',
        recording: result
      })
    })
    .catch( err => {
      res.status(500).json({
        message: 'save recording failed',
        error: err
      })
    })

})

router.get('/:recordId', (req, res, next) => {
  const id = req.params.recordId
  Recording.findById(id)
    .then( doc => {
      if (doc){
        res.status(200).json({
          _id: doc.id,
          title: doc.title,
          audio: Buffer.from(doc.audio.buffer).toString('base64')
        })
      }else{
        res.status(404).json({message: 'id not found'})
      }

    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
})

router.patch('/:recordId', (req, res, next) => {
  const id = req.params.recordId
  Recording.updateOne({_id: id}, { $set: {title: req.body.title}})
    .exec()
    .then( result => {
      res.status(200).json({result})
    })
    .catch(err => {
      res.status(500).json({error : err})
    })
})

router.delete('/:recordId', (req, res, next) => {
  const id = req.params.recordId
  Recording.deleteOne({_id: id})
    .exec()
    .then( result => {
      res.status(200).json({result})
    })
    .catch(err => {
      res.status(500).json({error : err})
    })
})

module.exports = router
