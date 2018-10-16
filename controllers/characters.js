const Character = require('../models/character')
const express = require('express')
router = express.Router()
const Quote = require('../models/quote')
//INDEX
router.get('/', (req, res) => {
    res.render('character-index')
    });

// NEW
router.get('/character/new', (req, res) => {
        console.log(req.params);

        res.render('character-new', {});
    });

// CREATE
router.post('/character', (req, res) => {
    Character.create(req.body).then((character) => {
        console.log(character)
        res.redirect(`/character/${character._id}`) // Redirect to character/:id
    }).catch((err) => {
        console.log(err.message)
    })
})

    // SHOW
router.get('/character/:id', (req, res) => {
    // find character
    Character.findById(req.params.id).then(character => {
        // find its quote
        Quote.find({
            characterId: req.params.id}).then(quote => {
            // respond with the template with both values
            res.render('character-show', {
                character: character,
                quote: quote
            })
        })
    }).catch((err) => {
        // catch errors
        console.log(err.message)
    });
});


    // EDIT
    router.get('/character/:id/edit', function(req, res) {
        Character.findById(req.params.id, function (err, character) {
            res.render('character-edit', {
                character: character
            });
        })
    })

    // UPDATE
    router.put('/character/:id', (req, res) => {
        Character.findByIdAndUpdate(req.params.id, req.body)
            .then(character => {
                res.redirect(`/character/${character._id}`)
            })
            .catch(err => {
                console.log(err.message)
            })
    })

    // DELETE
    router.delete('/character/:id', function (req, res) {
        console.log("DELETE character")
        Character.findByIdAndRemove(req.params.id).then((review) => {
            res.redirect('/');
        }).catch((err) => {
            console.log(err.message);
        })
    })

module.exports = router