const express = require('express');
const axios = require('axios');

const {mongoose} = require('./server/db/mongoose');
const {Movies} = require('./server/models/movies');
const {Comments} = require('./server/models/comments');
const bodyParser = require('body-parser');


const app = express();
// const router = express.Router();
const port = process.env.PORT || 3003;
const apiKey = 'e8c735ec';

app.use(express.static('public'));
// app.use(router);
app.use(bodyParser.json());

app.post('/moviesSearch', (req,res) => {
  let reqUrl = '';
  let movieTitle = req.body.title;
  let movieYear = req.body.year;
  if (req.body.year) {
   reqUrl = `http://www.omdbapi.com/?t=${movieTitle}&y=${movieYear}&apiKey=${apiKey}`;
  } else {
   reqUrl = `http://www.omdbapi.com/?t=${movieTitle}&apikey=${apiKey}`;
  }
  axios.get(reqUrl)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      res.status(400).send(e);
    });
});

app.post('/movieSave', (req,res) => {
  let movie = new Movies(req.body);
  movie.save().then(() => {
    res.send(movie);
  }).catch((e) => {
    res.send('exist');
  })
});

app.post('/movieShow', (req,res) => {
  let id = req.body._id;
  Movies.findById(id).then((movie) => {
    res.send(movie);
  },(e) => {
    res.status(400).send(e);
  })
});

app.post('/movieDelete', (req,res) => {
  Movies.findByIdAndRemove(req.body.id).then((movie) => {
  if (!movie) {
    return res.status(404).send;
  }
    res.send({movie});
  }).catch((e) => {
    res.status(400).send;
  })
});

app.get('/movies',(req, res) => {
  Movies.find({}).then((movies) => {
    res.send(movies);
  },(e) => {
    res.status(400).send(e);
  })
});

app.post('/comments',(req, res) => {
  let comment = new Comments(req.body);
  comment.save().then(() => {
    res.send(comment);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.get('/comments',(req, res) => {
  Comments.find({}).then((comments) => {
    res.send(comments);
  },(e) => {
    res.status(400).send(e);
  })
});

app.post('/commentDelete', (req,res) => {
  Comments.findByIdAndRemove(req.body.id).then((comment) => {
  if (!comment) {
    return res.status(404).send;
  }
    res.send({comment});
  }).catch((e) => {
    res.status(400).send;
  })
});

app.get('/comments_dialog', function(req, res) {
  res.send(commentsDialogTemplate);
});

app.get('*', function(req, res) {
  res.redirect(`http://${req.header('host')}`);
});

app.listen(port, ()=> {
   console.log(`Starting application on ${port}`);
});
