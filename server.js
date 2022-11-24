// dependencies
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Movie = require('./models/movie.js');
const Tv = require('./models/tv.js');
const Anime = require('./models/anime.js');
const app = express();


// config
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static('public'));


let PORT = 3000;
if(process.env.PORT) {
  PORT = process.env.PORT
}

// DELETE ROUTES ////////////////////////////////////////////////////////////////
// deleting anime route
app.delete('/anime/:id', (req, res) => {
  Anime.findByIdAndRemove(req.params.id, (err, deletedAnime) => {
    res.redirect('/anime')
  })
});

// deleting tv route
app.delete('/tv/:id', (req, res) => {
  Tv.findByIdAndRemove(req.params.id, (err, deletedTv) => {
    res.redirect('/tv')
  })
});

// deleting Movie route
app.delete('/:id', (req, res) => {
  Movie.findByIdAndRemove(req.params.id, (err, deletedMovie) => {
    res.redirect('/')
  })
});

// EDITING ROUTES ///////////////////////////////////////////////////////////////
// adding edited anime route
app.put('/anime/:id', (req, res) => {
  if (req.body.watched === 'on') {
    req.body.watched = true
  } else {
    req.body.watched = false
  }
  Anime.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedAnime) => {
    res.redirect('/anime')
  })
});

// adding edited tv route
app.put('/tv/:id', (req, res) => {
  if (req.body.watched === 'on') {
    req.body.watched = true
  } else {
    req.body.watched = false
  }
  Tv.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedTv) => {
    res.redirect('/tv')
  })
});


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

// anime edit page route
app.get('/anime/:id/edit', (req, res) => {
  Anime.findById(req.params.id, (err, foundAnime) => {
    res.render('animeEdit.ejs',
    {foundAnime: foundAnime})
  })
});

// tv edit page route
app.get('/tv/:id/edit', (req, res) => {
  Tv.findById(req.params.id, (err, foundTv) => {
    res.render('tvEdit.ejs',
    {foundTv: foundTv})
  })
});

// Movie edit page route
app.get('/:id/edit', (req, res) => {
  Movie.findById(req.params.id, (err, foundMovie) => {
    res.render('edit.ejs',
    {foundMovie: foundMovie})
  })
});

// NEW PAGE ROUTES //////////////////////////////////////////////////////////////
// adds new anime to the anime index
app.post('/anime', (req, res) => {
  if (req.body.watched === 'on') {
    req.body.watched = true
  } else {
    req.body.watched = false
  }
  Anime.create(req.body, (err, addedAnime) => {
    res.redirect('/anime')
  })
});

// adds new tv to tv tv index
app.post('/tv', (req, res) => {
  if (req.body.watched === 'on') {
    req.body.watched = true
  } else {
    req.body.watched = false
  }
  Tv.create(req.body, (err, addedTv) => {
    res.redirect('/tv')
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

// anime new page route
app.get('/anime/new', (req, res) => {
  res.render('animeNew.ejs')
});

// Tv new page route
app.get('/tv/new', (req, res) => {
  res.render('tvNew.ejs')
});


// Movie new page route
app.get('/new', (req, res) => {
  res.render('new.ejs')
});

// INDEX PAGE ROUTES ////////////////////////////////////////////////////////////
// anime index page route
app.get('/anime', (req, res) => {
  Anime.find({}, (err, allAnime) => {
    res.render('animeIndex.ejs',
    {allAnime: allAnime})
  })
});

// tv index page route
app.get('/tv', (req, res) => {
  Tv.find({}, (err, allTv) => {
    res.render('tvIndex.ejs',
    {allTv: allTv})
  })
});

// main Movie index page route
app.get('/', (req, res) => {
  Movie.find({}, (err, allMovies) => {
    res.render('index.ejs',
    {allMovies: allMovies})
  })
});

// SHOW PAGE ROUTES /////////////////////////////////////////////////////////////
// anime show page route
app.get('/anime/:id', (req, res) => {
  Anime.findById(req.params.id, (err, foundAnime) => {
    res.render('animeShow.ejs',
    {foundAnime: foundAnime})
  })
});

// tv show page route
app.get('/tv/:id', (req, res) => {
  Tv.findById(req.params.id, (err, foundTv) => {
    res.render('tvShow.ejs',
    {foundTv: foundTv})
  })
});

// Movie show page route
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
