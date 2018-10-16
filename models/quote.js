const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Quote = module.exports = mongoose.model('Quote', {
    title: String,
    quote: String,
    characterId: { type: Schema.Types.ObjectId, ref: 'Character' }

});

module.exports = Quote