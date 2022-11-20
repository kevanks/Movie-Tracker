const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  director: String,
  genre: String,
  watched: Boolean,
  rating: {type: Number, min: 1, max: 5},
  comments: String
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie
