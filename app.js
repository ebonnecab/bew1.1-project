//Express.js
const express = require('express')
const app = express()
//methodOverride
const methodOverride = require('method-override')
// Initialize Body-Parser
const bodyParser = require('body-parser');
//controller    
const character = require('./controllers/characters.js');
const quote = require('./controllers/quotes.js');
// //models
// const Quote = require('../models/quote')
// const Character = require('../models/character')
//mongoose
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost/Rick-Morty');

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

app.use(bodyParser.urlencoded({ extended: true }));

//Express handlebars template
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));

app.set('view engine', 'handlebars');

app.use('/', character)

// app.use('/character/quote', quote)

app.post('/character/quote', (req, res) => {
    console.log(req.body)
    // Quote.create(req.body).then(quote => {
    //     res.redirect(`/character/${quote.CharacterId}`);
    // }).catch((err) => {
    //     console.log(err.message);
    // });
});

app.listen(process.env.PORT || 3000, () => {
    console.log('App listening on port 3000!')
})



module.exports = app;

