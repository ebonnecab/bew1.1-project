//Express.js
const express = require('express')
const app = express()

//Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Rick-Morty');

const Character = mongoose.model('Character', {
    name: String,
    episode: String
});


//Express handlebars template
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


// Array of Rick and Morty Characters
let character = [
    { name: "Rick Sanchez", episode: "Episode 5" },
    { name: "Pickle Rick", episode: "Episode 2"}
]

// ROOT ROUTE
app.get('/', (req, res) => {
    Character.find()
        .then(character => {
            res.render('character-index', { character: character});
        })
        .catch(err => {
            console.log(err);
        })
})

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})



module.exports = app;

