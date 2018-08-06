const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  googleId: String,
  thumbnail: String,
  facebookId: String,
  movie: [{movieId: String, rating: Number}],
  watchList: [String]
});

const User = mongoose.model('user', userSchema);
module.exports = User;