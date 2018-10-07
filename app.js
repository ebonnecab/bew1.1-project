//Express.js
const express = require('express')
const app = express()

//methodOverride
const methodOverride = require('method-override')

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

//Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Rick-Morty');

const Character = mongoose.model('Character', {
    name: String,
    episode: String,
    origin: String
});


//Express handlebars template
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Initialize Body-Parser
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));


// INDEX
app.get('/', (req, res) => {
    Character.find()
        .then(character => {
            res.render('character-index', { character: character});
        })
        .catch(err => {
            console.log(err);
        })
})

// NEW
app.get('/character/new', (req, res) => {
    res.render('character-new', {});
})

// CREATE
app.post('/character', (req, res) => {
    Character.create(req.body).then((character) => {
        console.log(character);
        res.redirect(`/character/${character._id}`) 
    }).catch((err) => {
        console.log(err.message)
    })
})

// SHOW
app.get('/character/:id', (req, res) => {
    Character.findById(req.params.id).then((character) => {
        res.render('character-show', { character: character })
    }).catch((err) => {
        console.log(err.message);
    })
})


// EDIT
app.get('/character/:id/edit', (req, res) => {
    Character.findById(req.params.id, function (err, character) {
        res.render('character-edit', {
            character: character
        });
    })
})

// UPDATE
app.put('/character/:id', (req, res) => {
    Character.findByIdAndUpdate(req.params.id, req.body)
        .then(character => {
            res.redirect(`/character/${character._id}`)
        })
        .catch(err => {
            console.log(err.message)
        })
})

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})



module.exports = app;

