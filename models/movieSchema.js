const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  director: String,
  genre: String,
  watched: Boolean,
  rating: Number,
  comments: String
})

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
