const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const NewWord = Schema({
  enWord: { type: String, require: true },
  vnWord: { type: String, require: true },
  studied: { type: Boolean, default: false },
});

module.exports = mongoose.model('NewWord', NewWord);
