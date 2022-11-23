// dependencies
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Movie = require('./models/movie.js');
const app = express();


// config
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static('public'));


let PORT = 3000;
if(process.env.PORT) {
  PORT = process.env.PORT
}


// deleting route
app.delete('/:id', (req, res) => {
  Movie.findByIdAndRemove(req.params.id, (err, deletedMovie) => {
    res.redirect('/')
  })
})

// adding edited movie route
app.put('/:id', (req, res) => {
  if (req.body.watched === 'on') {
    req.body.watched = true
  } else {
    req.body.watched = false
  }
  Movie.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedMovie) => {
    res.redirect('/')
  })
});

// edit page route
app.get('/:id/edit', (req, res) => {
  Movie.findById(req.params.id, (err, foundMovie) => {
    res.render('edit.ejs',
    {foundMovie: foundMovie})
  })
});


// adds new movie to index
app.post('/', (req, res) => {
  if (req.body.watched === 'on') {
    req.body.watched = true
  } else {
    req.body.watched = false
  }
  Movie.create(req.body, (err, addedMovie) => {
    res.redirect('/')
  })
});


// new page route
app.get('/new', (req, res) => {
  res.render('new.ejs')
});


// main index page route
app.get('/', (req, res) => {
  Movie.find({}, (err, allMovies) => {
    res.render('index.ejs',
    {allMovies: allMovies})
  })
});

// show page route
app.get('/:id', (req, res) => {
  Movie.findById(req.params.id, (err, foundMovie) => {
    res.render('show.ejs',
    {foundMovie: foundMovie})
  })
});


mongoose.connect('mongodb+srv://kevanks:berserk2018@cluster0.fqh55jt.mongodb.net/?retryWrites=true&w=majority', () => {
  console.log('Connected to Mongo');
});

app.listen(PORT, () => {
  console.log('Listening...');
})
