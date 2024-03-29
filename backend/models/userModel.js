const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  confirmPassword: String,
  imgUrl: { type: String, default: null },
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
