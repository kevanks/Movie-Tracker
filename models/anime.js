const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema({
  title: String,
  year: Number,
  numSeasons: Number,
  mangaka: String,
  genre: String,
  studio: String,
  watched: Boolean,
  rating: {type: Number, min: 1, max:5},
  comments: String,
  imgUrl: String
})

const Anime = mongoose.model('Anime', animeSchema)

module.exports = Anime
