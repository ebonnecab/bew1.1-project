
const mongoose = require('mongoose');
const Schema = mongoose.Schema
const Character = module.exports = mongoose.model('Character', {
    name: String,
    episode: String,
    origin: String
});

module.exports = Character