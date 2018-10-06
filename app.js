const express = require('express')
const app = express()

//Express handlebars template
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//Root route
app.get('/', (req, res) => {
    res.render('home', { msg: 'Handlebars are so cool!'});
})

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})

module.exports = app;
