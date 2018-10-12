//Express.js
const express = require('express')
const app = express()
//methodOverride
const methodOverride = require('method-override')
// Initialize Body-Parser
const bodyParser = require('body-parser');
//controller    
const character = require('./controllers/characters.js');
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

app.listen(process.env.PORT || 3000, () => {
    console.log('App listening on port 3000!')
})



module.exports = app;

