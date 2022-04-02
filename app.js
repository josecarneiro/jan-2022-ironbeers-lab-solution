const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (request, response) => {
  punkAPI
    .getBeers()
    .then(beers => {
      response.render('beers', { beers: beers });
    })
    .catch(error => {
      console.log(error);
    });
});

app.get('/random-beer', (request, response) => {
  punkAPI
    .getRandom()
    .then(beers => {
      const beer = beers[0];
      response.render('random-beer', { beer: beer });
    })
    .catch(error => {
      console.log(error);
    });
});

app.get('/beers/:id', (request, response) => {
  const id = request.params.id;
  punkAPI
    .getBeer(id)
    .then(beers => {
      const beer = beers[0];
      response.render('random-beer', { beer: beer });
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(3000, () => console.log('🏃 on port 3000'));
