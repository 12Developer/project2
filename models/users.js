const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
  username: String,
  password: String,
  first_name: String,
  last_name: String,
  item_description: String,
  item_title: String,
  item_image: String
});


const User = mongoose.model('User', userSchema);

module.exports = User;
