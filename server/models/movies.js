const mongoose = require('mongoose');

const Movies = mongoose.model('Movies',{
  Title: {
    type: String,
    trim: true
  },
  Year: {
    type: String,
    trim: true
  },
  Rated: {
    type: String,
    trim: true
  },
  Released: {
    type: String,
    trim: true
  },
  Runtime: {
    type: String,
    trim: true
  },
  Genre: {
    type: String,
    trim: true
  },
  Director: {
    type: String,
    trim: true
  },
  Writer: {
    type: String,
    trim: true
  },
  Actors: {
    type: String,
    trim: true
  },
  Plot: {
    type: String,
    trim: true
  },
  Language: {
    type: String,
    trim: true
  },
  Country: {
    type: String,
    trim: true
  },
  Awards: {
    type: String,
    trim: true
  },
  Poster: {
    type: String,
    trim: true
  },
  Ratings: [{
    Source: {
      type: String,
      trim: true
    },
    Value: {
      type: String,
      trim: true
    }
  }],
  Metascore: {
    type: String,
    trim: true
  },
  imdbRating: {
    type: Number,
    trim: true
  },
  imdbVotes: {
    type: String,
    trim: true
  },
  imdbID: {
    type: String,
    trim: true,
    unique: true,
  },
  Type: {
    type: String,
    trim: true
  },
  DVD: {
    type: String,
    trim: true
  },
  BoxOffice: {
    type: String,
    trim: true
  },
  Production: {
    type: String,
    trim: true
  },
  Website: {
    type: String,
    trim: true
  },
  Watched: {
    type: Boolean,
    trim: true
  },
});

module.exports = {
  Movies
};
