const mongoose = require('mongoose');

const tvSchema = new mongoose.Schema({
  title: String,
  year: Number,
  numSeasons: Number,
  genre: String,
  watched: Boolean,
  rating: {type: Number, min: 1, max: 5},
  comments: String,
  imgUrl: String
})

const Tv = mongoose.model('Tv', tvSchema)

module.exports = Tv
