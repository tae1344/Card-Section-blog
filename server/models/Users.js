const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 30
  },
  email: {
    type: String,
    trim: true, // 공백 제거
    unique: 1 //중복 방지
  },
  password: {
    type: String,
    minlength: 5
  },

});


const User = mongoose.model('User', userSchema);
module.exports = { User };