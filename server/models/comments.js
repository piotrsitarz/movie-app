const mongoose = require('mongoose');

const Comments = mongoose.model('Comments',{
  user: {
    type: String,
    trim: true
  },
  content: {
    type: String,
    trim: true
  },
  vote: {
    type: Number,
    trim: true
  },
  idOfMovie: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  titleOfMovie: {
    type: String,
    trim: true
  }
});

module.exports = {
  Comments
};
