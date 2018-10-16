const Character = require('../models/character')
const express = require('express')
//rick and morty api
const tinyRick = require('rickmortyapi')
router = express.Router()
const Quote = require('../models/quote')
//INDEX
router.get('/', (req, res) => {
    tinyRick.getCharacter().then(response => {
        res.render('character-index', { character: response.results });
    }).catch(console.error)
    
})

    // SHOW
<<<<<<< HEAD
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
=======
    router.get('/character/:id', (req, res) => {
        var characterId = req.params.id
        console.log(characterId)
        tinyRick.getCharacter({id:characterId}).then((character) => {
            res.render('character-show', { 
                character: character 
>>>>>>> master
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