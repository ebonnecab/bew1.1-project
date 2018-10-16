const Quote = require('../models/quote')
const express = require('express')
router = express.Router()

// NEW quote
router.post('/character/quote', (req, res) => {
    console.log(req.body)
    // Quote.create(req.body).then(quote => {
    //     res.redirect(`/character/${quote.CharacterId}`);
    // }).catch((err) => {
    //     console.log(err.message);
    // });
});
module.exports = router