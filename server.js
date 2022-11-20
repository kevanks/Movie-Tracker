// dependencies
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();

let PORT = 3000;
if (process.env.PORT) {
  PORT = process.env.PORT
}

// config
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static('public'));




app.get('/movies', (req, res) => {
  res.render('index.ejs')
})



mongoose.connect('mongodb+srv://kevanks:Berserk2018!?@cluster0.fqh55jt.mongodb.net/?retryWrites=true&w=majority', () => {
  console.log('Connected to Mongo');
});

app.listen(PORT, () => {
  console.log('Listening...');
})
